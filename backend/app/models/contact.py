# app/models/contact.py

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class Contact(Base):
    __tablename__ = "contacts"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    phone = Column(String, index=True, nullable=False)
    city = Column(String, index=True, nullable=False)

    company_id = Column(Integer, ForeignKey("companies.id", ondelete="CASCADE"), nullable=False)
    company = relationship("Company", back_populates="contacts")

    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
