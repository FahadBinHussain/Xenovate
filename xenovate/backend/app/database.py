import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from supabase import create_client, Client
from datetime import datetime

# Load environment variables
load_dotenv()

# Get environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

# Initialize SQLAlchemy
engine = create_engine(DATABASE_URL) if DATABASE_URL else None
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) if engine else None
Base = declarative_base()

# Define SQLAlchemy models
class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    algorithms = relationship("Algorithm", back_populates="owner")

class Algorithm(Base):
    __tablename__ = "algorithms"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    code = Column(Text)
    language = Column(String)
    user_id = Column(String, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    owner = relationship("User", back_populates="algorithms")
    analyses = relationship("Analysis", back_populates="algorithm")

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    algorithm_id = Column(Integer, ForeignKey("algorithms.id"))
    time_complexity = Column(String)
    space_complexity = Column(String)
    optimization_suggestions = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    algorithm = relationship("Algorithm", back_populates="analyses")

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create tables if they don't exist
if engine:
    Base.metadata.create_all(bind=engine)

# Supabase helper functions
def get_user_by_id(user_id):
    if not supabase:
        return None
    return supabase.table("users").select("*").eq("id", user_id).execute()

def save_algorithm(user_id, title, description, code, language):
    if not supabase:
        return None
    return supabase.table("algorithms").insert({
        "user_id": user_id,
        "title": title,
        "description": description,
        "code": code,
        "language": language,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }).execute()

def get_user_algorithms(user_id):
    if not supabase:
        return None
    return supabase.table("algorithms").select("*").eq("user_id", user_id).execute()

def save_analysis(algorithm_id, time_complexity, space_complexity, optimization_suggestions=None):
    if not supabase:
        return None
    return supabase.table("analyses").insert({
        "algorithm_id": algorithm_id,
        "time_complexity": time_complexity,
        "space_complexity": space_complexity,
        "optimization_suggestions": optimization_suggestions,
        "created_at": datetime.utcnow().isoformat()
    }).execute() 