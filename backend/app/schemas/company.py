from pydantic import BaseModel
from typing import Optional, List
from app.schemas.contact import ContactOut
from typing import Optional

class CompanyBase(BaseModel):
    name: str
    status: str
    description: Optional[str] = None

class CompanyCreate(CompanyBase):
    pass

class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[str] = None
    description: Optional[str] = None

class CompanyOut(CompanyBase):
    id: int
    contacts: List["ContactOut"] = []
    
    class Config:
        from_attributes = True 

class CompanyOptions(BaseModel):
    id: int
    name: str