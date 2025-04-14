from pydantic import BaseModel
from typing import Optional
# from app.schemas.company import CompanyOut

class ContactBase(BaseModel):
    name: str
    phone: str
    city: str
    company_id: int

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    company_id: Optional[int] = None

class ContactOut(ContactBase):
    id: int
    
    class Config:
        from_attributes = True 
