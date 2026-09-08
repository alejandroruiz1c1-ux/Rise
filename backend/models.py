from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, ForeignKey, JSON, Text, Enum as SQLEnum, LargeBinary
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base
import enum

# ========== USUARIOS ==========

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String, nullable=True)
    password_hash = Column(String)
    
    # Perfil
    first_name = Column(String, nullable=True)
    avatar_color = Column(String, default="#f97316")
    theme = Column(String, default="rise")  # rise, dark, light, auto
    language = Column(String, default="es")  # es, en
    
    # Datos gamificación
    xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    rank = Column(String, default="Recluta")
    best_streak = Column(Integer, default=0)
    current_streak = Column(Integer, default=0)
    
    # Verificación
    email_verified = Column(Boolean, default=False)
    phone_verified = Column(Boolean, default=False)
    two_factor_enabled = Column(Boolean, default=True)
    otp_secret = Column(String, nullable=True)
    
    # Onboarding
    onboarding_completed = Column(Boolean, default=False)
    onboarding_step = Column(Integer, default=0)
    
    # Privacidad
    data_export_enabled = Column(Boolean, default=True)
    notifications_enabled = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    
    # Relaciones
    habits = relationship("Habit", back_populates="user", cascade="all, delete-orphan")
    goals = relationship("Goal", back_populates="user", cascade="all, delete-orphan")
    objectives = relationship("Objective", back_populates="user", cascade="all, delete-orphan")
    missions = relationship("Mission", back_populates="user", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="user", cascade="all, delete-orphan")
    diary_entries = relationship("DiaryEntry", back_populates="user", cascade="all, delete-orphan")
    achievements = relationship("Achievement", back_populates="user", cascade="all, delete-orphan")
    xp_history = relationship("XPHistory", back_populates="user", cascade="all, delete-orphan")
    attributes = relationship("UserAttribute", back_populates="user", cascade="all, delete-orphan")

# ========== HÁBITOS ==========

class Habit(Base):
    __tablename__ = "habits"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Definición
    name = Column(String, index=True)
    description = Column(Text, nullable=True)
    icon = Column(String, default="ti-check")
    color = Column(String, default="#f97316")
    category = Column(String, default="Otro")
    xp_reward = Column(Integer, default=10)
    
    # Tipo
    is_custom = Column(Boolean, default=True)
    is_hidden = Column(Boolean, default=False)
    frequency = Column(String, default="daily")  # daily, weekly
    
    # Seguimiento
    streak = Column(Integer, default=0)
    best_streak = Column(Integer, default=0)
    times_completed = Column(Integer, default=0)
    
    # Datos de usuario (para lectura/diario)
    has_notes = Column(Boolean, default=False)
    has_voice = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="habits")
    completions = relationship("HabitCompletion", back_populates="habit", cascade="all, delete-orphan")

class HabitCompletion(Base):
    __tablename__ = "habit_completions"
    
    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    
    completed_at = Column(DateTime, default=datetime.utcnow, index=True)
    xp_earned = Column(Integer, default=10)
    notes = Column(Text, nullable=True)
    voice_url = Column(String, nullable=True)
    
    habit = relationship("Habit", back_populates="completions")

# ========== OBJETIVOS Y METAS ==========

class Goal(Base):
    """Metas con recompensa (ej: ahorrar $1000, correr 100km)"""
    __tablename__ = "goals"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    title = Column(String)
    description = Column(Text, nullable=True)
    target_value = Column(Float)
    current_value = Column(Float, default=0)
    unit = Column(String)  # dinero, km, días, repeticiones
    reward = Column(String)
    
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    deadline = Column(DateTime, nullable=True)
    
    user = relationship("User", back_populates="goals")

class Objective(Base):
    """Objetivos del mes (hasta 3, para reflexión)"""
    __tablename__ = "objectives"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    text = Column(String)
    month_key = Column(String)  # YYYY-MM
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="objectives")

# ========== MISIONES ==========

class Mission(Base):
    __tablename__ = "missions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    name = Column(String)
    description = Column(Text, nullable=True)
    mission_type = Column(String)  # daily, weekly, special
    difficulty = Column(String, default="normal")  # easy, normal, hard
    
    target = Column(Integer)
    current = Column(Integer, default=0)
    xp_reward = Column(Integer)
    
    is_completed = Column(Boolean, default=False)
    is_claimed = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    expires_at = Column(DateTime, nullable=True)
    
    user = relationship("User", back_populates="missions")

# ========== FINANZAS ==========

class FinanceCategory(Base):
    __tablename__ = "finance_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    name = Column(String)
    icon = Column(String, default="ti-tag")
    color = Column(String)
    type = Column(String)  # income, expense
    
    created_at = Column(DateTime, default=datetime.utcnow)

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    type = Column(String)  # income, expense
    amount = Column(Float)
    category = Column(String)
    description = Column(String, nullable=True)
    payment_method = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    user = relationship("User", back_populates="transactions")

class Budget(Base):
    __tablename__ = "budgets"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    category = Column(String)
    monthly_limit = Column(Float)
    current_spent = Column(Float, default=0)
    month_key = Column(String)  # YYYY-MM
    
    created_at = Column(DateTime, default=datetime.utcnow)

class SavingsGoal(Base):
    __tablename__ = "savings_goals"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    name = Column(String)
    description = Column(Text, nullable=True)
    target_amount = Column(Float)
    current_amount = Column(Float, default=0)
    deadline = Column(DateTime, nullable=True)
    
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)

# ========== DIARIO ==========

class DiaryEntry(Base):
    __tablename__ = "diary_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    content = Column(Text)
    mood = Column(String, nullable=True)
    gratitude = Column(Text, nullable=True)
    lessons = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    user = relationship("User", back_populates="diary_entries")

class MonthlyReflection(Base):
    __tablename__ = "monthly_reflections"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    month_key = Column(String)  # YYYY-MM
    content = Column(Text)
    
    created_at = Column(DateTime, default=datetime.utcnow)

# ========== GAMIFICACIÓN ==========

class XPHistory(Base):
    __tablename__ = "xp_history"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    amount = Column(Integer)
    reason = Column(String)  # "habit_complete", "mission_claim", etc
    source_id = Column(Integer, nullable=True)
    source_type = Column(String, nullable=True)  # habit, mission, etc
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    user = relationship("User", back_populates="xp_history")

class Achievement(Base):
    __tablename__ = "achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    achievement_key = Column(String)  # first_habit, 7_day_streak, etc
    name = Column(String)
    description = Column(String)
    icon = Column(String)
    xp_reward = Column(Integer, default=0)
    
    unlocked_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="achievements")

class UserAttribute(Base):
    """Atributos derivados del progreso (no editables manualmente)"""
    __tablename__ = "user_attributes"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    attribute_key = Column(String)  # discipline, health, focus, etc
    points = Column(Integer, default=0)
    
    user = relationship("User", back_populates="attributes")