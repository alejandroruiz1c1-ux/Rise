from bcrypt import hashpw, checkpw, gensalt
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from config import get_settings
import secrets
import string

settings = get_settings()

# ========== PASSWORD ==========

def hash_password(password: str) -> str:
    """Hashear contraseña con bcrypt"""
    salt = gensalt()
    hashed = hashpw(password.encode(), salt)
    return hashed.decode()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verificar contraseña"""
    return checkpw(plain_password.encode(), hashed_password.encode())

# ========== JWT ==========

def create_access_token(data: dict, expires_delta: timedelta = None):
    """Crear JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.access_token_expire_minutes
        )
    
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

def create_refresh_token(data: dict):
    """Crear JWT refresh token"""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=settings.refresh_token_expire_days)
    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

def verify_token(token: str):
    """Verificar JWT token y retornar user_id"""
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        user_id: int = payload.get("sub")
        if user_id is None:
            return None
        return user_id
    except JWTError:
        return None

# ========== OTP ==========

def generate_otp() -> str:
    """Generar código OTP de 6 dígitos"""
    return ''.join(secrets.choice(string.digits) for _ in range(6))

def generate_otp_secret() -> str:
    """Generar secreto para authenticator apps"""
    return ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(32))

# ========== ENCRIPCIÓN ==========

from cryptography.fernet import Fernet
import base64
import hashlib

def get_cipher_key(user_id: int) -> bytes:
    """Generar llave de encripción derivada del user_id y secret"""
    data = f"{user_id}{settings.secret_key}".encode()
    hash_obj = hashlib.sha256(data)
    key = base64.urlsafe_b64encode(hash_obj.digest())
    return key

def encrypt_data(data: str, user_id: int) -> str:
    """Encriptar datos sensibles"""
    key = get_cipher_key(user_id)
    cipher = Fernet(key)
    encrypted = cipher.encrypt(data.encode())
    return encrypted.decode()

def decrypt_data(encrypted_data: str, user_id: int) -> str:
    """Desencriptar datos sensibles"""
    try:
        key = get_cipher_key(user_id)
        cipher = Fernet(key)
        decrypted = cipher.decrypt(encrypted_data.encode())
        return decrypted.decode()
    except:
        return None