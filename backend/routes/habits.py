from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime, timedelta

from database import get_db
from models import User, Habit, HabitCompletion, XPHistory
from security import verify_token

router = APIRouter(prefix="/api/habits", tags=["habits"])

# ========== SCHEMAS ==========

class HabitCreate(BaseModel):
    name: str
    description: str = None
    icon: str = "ti-check"
    color: str = "#f97316"
    category: str = "Otro"
    xp_reward: int = 10
    frequency: str = "daily"

class HabitUpdate(BaseModel):
    name: str = None
    description: str = None
    icon: str = None
    color: str = None
    category: str = None
    xp_reward: int = None

# ========== HELPERS ==========

def get_current_user(authorization: str, db: Session):
    """Obtener usuario autenticado"""
    if not authorization:
        raise HTTPException(status_code=401, detail="No autorizado")
    
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Tipo de token inválido")
    except:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Token expirado o inválido")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    return user

# ========== ENDPOINTS ==========

@router.post("/")
async def create_habit(
    habit: HabitCreate,
    authorization: str = None,
    db: Session = Depends(get_db)
):
    """Crear un nuevo hábito personalizado"""
    
    user = get_current_user(authorization, db)
    
    # Validar
    if len(habit.name) < 3:
        raise HTTPException(status_code=400, detail="El nombre debe tener mínimo 3 caracteres")
    
    # Crear hábito
    new_habit = Habit(
        user_id=user.id,
        name=habit.name,
        description=habit.description,
        icon=habit.icon,
        color=habit.color,
        category=habit.category,
        xp_reward=habit.xp_reward,
        frequency=habit.frequency,
        is_custom=True
    )
    
    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)
    
    return {
        "id": new_habit.id,
        "name": new_habit.name,
        "xp_reward": new_habit.xp_reward,
        "created_at": new_habit.created_at
    }

@router.get("/")
async def get_habits(authorization: str = None, db: Session = Depends(get_db)):
    """Obtener todos los hábitos del usuario"""
    
    user = get_current_user(authorization, db)
    habits = db.query(Habit).filter(Habit.user_id == user.id).all()
    
    return [
        {
            "id": h.id,
            "name": h.name,
            "icon": h.icon,
            "color": h.color,
            "xp_reward": h.xp_reward,
            "streak": h.streak,
            "category": h.category,
            "times_completed": h.times_completed
        }
        for h in habits
    ]

@router.put("/{habit_id}")
async def update_habit(
    habit_id: int,
    habit: HabitUpdate,
    authorization: str = None,
    db: Session = Depends(get_db)
):
    """Actualizar hábito"""
    
    user = get_current_user(authorization, db)
    
    db_habit = db.query(Habit).filter(
        Habit.id == habit_id,
        Habit.user_id == user.id
    ).first()
    
    if not db_habit:
        raise HTTPException(status_code=404, detail="Hábito no encontrado")
    
    # Actualizar campos
    update_data = habit.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_habit, field, value)
    
    db_habit.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_habit)
    
    return {"message": "Hábito actualizado"}

@router.delete("/{habit_id}")
async def delete_habit(
    habit_id: int,
    authorization: str = None,
    db: Session = Depends(get_db)
):
    """Eliminar hábito personalizado"""
    
    user = get_current_user(authorization, db)
    
    db_habit = db.query(Habit).filter(
        Habit.id == habit_id,
        Habit.user_id == user.id,
        Habit.is_custom == True  # Solo custom
    ).first()
    
    if not db_habit:
        raise HTTPException(status_code=404, detail="Hábito no encontrado")
    
    db.delete(db_habit)
    db.commit()
    
    return {"message": "Hábito eliminado"}

@router.post("/{habit_id}/complete")
async def complete_habit(
    habit_id: int,
    authorization: str = None,
    db: Session = Depends(get_db)
):
    """Marcar hábito como completado hoy"""
    
    user = get_current_user(authorization, db)
    
    habit = db.query(Habit).filter(
        Habit.id == habit_id,
        Habit.user_id == user.id
    ).first()
    
    if not habit:
        raise HTTPException(status_code=404, detail="Hábito no encontrado")
    
    # Verificar si ya completó hoy
    today = datetime.utcnow().date()
    existing = db.query(HabitCompletion).filter(
        HabitCompletion.habit_id == habit_id,
        HabitCompletion.user_id == user.id,
        db.func.date(HabitCompletion.completed_at) == today
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Ya completaste este hábito hoy")
    
    # Crear completion
    completion = HabitCompletion(
        habit_id=habit_id,
        user_id=user.id,
        xp_earned=habit.xp_reward
    )
    
    # Actualizar hábito
    habit.times_completed += 1
    habit.streak += 1
    
    if habit.streak > habit.best_streak:
        habit.best_streak = habit.streak
    
    # Agregar XP al usuario
    user.xp += habit.xp_reward
    
    # Crear registro en XP history
    xp_record = XPHistory(
        user_id=user.id,
        amount=habit.xp_reward,
        reason=f"Completar hábito: {habit.name}",
        source_id=habit_id,
        source_type="habit"
    )
    
    db.add(completion)
    db.add(xp_record)
    db.commit()
    
    return {
        "message": "Hábito completado",
        "xp_earned": habit.xp_reward,
        "streak": habit.streak,
        "new_level": user.level
    }