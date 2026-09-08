from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from pydantic import BaseModel, EmailStr
import re

from database import get_db
from models import User
from security import (
    hash_password, verify_password, create_access_token, 
    create_refresh_token, verify_token, generate_otp
)
from config import get_settings

router = APIRouter(prefix="/api/auth", tags=["auth"])
settings = get_settings()

# ========== SCHEMAS ==========

class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirm_password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: dict

# ========== ENDPOINTS ==========

@router.post("/register", response_model=AuthResponse)
async def register(request: RegisterRequest, db: Session = Depends(get_db)):
    """Registrar nuevo usuario"""
    
    # Validaciones
    if request.password != request.confirm_password:
        raise HTTPException(status_code=400, detail="Las contraseñas no coinciden")
    
    if len(request.password) < 8:
        raise HTTPException(status_code=400, detail="Contraseña mínimo 8 caracteres")
    
    if len(request.username) < 3:
        raise HTTPException(status_code=400, detail="Username mínimo 3 caracteres")
    
    # Verificar duplicados
    existing_email = db.query(User).filter(User.email == request.email).first()
    existing_username = db.query(User).filter(User.username == request.username).first()
    
    if existing_email:
        raise HTTPException(status_code=400, detail="Email ya registrado")
    if existing_username:
        raise HTTPException(status_code=400, detail="Username ya existe")
    
    # Crear usuario
    hashed_pwd = hash_password(request.password)
    new_user = User(
        username=request.username,
        email=request.email,
        password_hash=hashed_pwd,
        xp=0,
        level=1,
        rank="Recluta",
        onboarding_completed=False,
        onboarding_step=0
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Crear tokens
    access_token = create_access_token({"sub": new_user.id})
    refresh_token = create_refresh_token({"sub": new_user.id})
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            "xp": new_user.xp,
            "level": new_user.level,
            "rank": new_user.rank,
            "onboarding_completed": new_user.onboarding_completed
        }
    }

@router.post("/login", response_model=AuthResponse)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Iniciar sesión"""
    
    user = db.query(User).filter(User.email == request.email).first()
    
    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Email o contraseña incorrectos")
    
    # Crear tokens
    access_token = create_access_token({"sub": user.id})
    refresh_token = create_refresh_token({"sub": user.id})
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "xp": user.xp,
            "level": user.level,
            "rank": user.rank,
            "onboarding_completed": user.onboarding_completed,
            "theme": user.theme,
            "language": user.language
        }
    }

@router.post("/refresh")
async def refresh_token(refresh_token: str, db: Session = Depends(get_db)):
    """Refrescar access token"""
    
    user_id = verify_token(refresh_token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    new_access_token = create_access_token({"sub": user.id})
    
    return {"access_token": new_access_token}

@router.post("/send-otp")
async def send_otp(email: EmailStr, db: Session = Depends(get_db)):
    """Enviar código OTP por email"""
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    otp_code = generate_otp()
    
    # TODO: Enviar email con Twilio SendGrid
    # send_email(user.email, f"Tu código OTP es: {otp_code}")
    
    # Por ahora, guardar en memoria o caché (implementar Redis después)
    # otp_storage[email] = {"code": otp_code, "expires_at": datetime.now() + timedelta(minutes=10)}
    
    return {"message": "OTP enviado a tu email"}