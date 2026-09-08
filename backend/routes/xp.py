from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config import get_settings

from database import get_db
from models import User
from security import verify_token

router = APIRouter(prefix="/api/xp", tags=["xp"])
settings = get_settings()

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

def calculate_level(xp: int) -> tuple:
    """Calcular nivel y rango basado en XP"""
    level = (xp // settings.level_xp_threshold) + 1
    rank_index = min((level - 1) // 2, len(settings.ranks) - 1)
    rank = settings.ranks[rank_index]
    xp_in_level = xp % settings.level_xp_threshold
    
    return level, rank, xp_in_level

@router.get("/profile")
async def get_xp_profile(authorization: str = None, db: Session = Depends(get_db)):
    """Obtener perfil XP/Nivel del usuario"""
    
    user = get_current_user(authorization, db)
    level, rank, xp_in_level = calculate_level(user.xp)
    
    return {
        "xp_total": user.xp,
        "level": level,
        "rank": rank,
        "xp_in_level": xp_in_level,
        "xp_needed_for_next_level": settings.level_xp_threshold,
        "progress_percentage": int((xp_in_level / settings.level_xp_threshold) * 100),
        "best_streak": user.best_streak,
        "current_streak": user.current_streak
    }

@router.get("/history")
async def get_xp_history(
    limit: int = 20,
    authorization: str = None,
    db: Session = Depends(get_db)
):
    """Obtener historial de XP ganado"""
    
    user = get_current_user(authorization, db)
    
    from models import XPHistory
    history = db.query(XPHistory).filter(
        XPHistory.user_id == user.id
    ).order_by(XPHistory.created_at.desc()).limit(limit).all()
    
    return [
        {
            "amount": h.amount,
            "reason": h.reason,
            "source_type": h.source_type,
            "created_at": h.created_at
        }
        for h in history
    ]