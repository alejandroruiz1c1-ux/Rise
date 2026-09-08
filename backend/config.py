from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql://postgres:password@localhost:5432/rise_db"
    
    # JWT
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7
    
    # Email (SendGrid)
    sendgrid_api_key: str = ""
    sendgrid_from_email: str = "noreply@rise.app"
    
    # SMS (Twilio)
    twilio_account_sid: str = ""
    twilio_auth_token: str = ""
    twilio_phone_number: str = ""
    
    # Voice (Google Cloud)
    google_cloud_key: str = ""
    
    # App
    debug: bool = True
    frontend_url: str = "http://localhost:3000"
    backend_url: str = "http://localhost:8000"
    
    # Gamificación
    level_xp_threshold: int = 300
    ranks: list = ["Recluta", "Aprendiz", "Constante", "Disciplinado", "Determinado", 
                   "Enfocado", "Resiliente", "Imparable", "Maestro", "Ascendido"]
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()