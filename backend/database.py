from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import get_settings

settings = get_settings()

# Motor de base de datos
engine = create_engine(
    settings.database_url,
    echo=settings.debug,
    pool_pre_ping=True,
    connect_args={"connect_timeout": 10}
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para modelos
Base = declarative_base()

# Dependency para obtener sesión
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Crear todas las tablas
def init_db():
    Base.metadata.create_all(bind=engine)