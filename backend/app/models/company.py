from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.orm import relationship
from app.db.database import Base
from sqlalchemy.sql import func
import enum

class CompanyStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"

class Company(Base):
    __tablename__ = "companies"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    status = Column(Enum(CompanyStatus), default=CompanyStatus.inactive, nullable=False)

    description = Column(String, nullable=True)

    contacts = relationship("Contact", back_populates="company", cascade="all, delete")
    
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
