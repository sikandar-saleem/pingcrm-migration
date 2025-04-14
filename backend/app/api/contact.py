from fastapi import APIRouter, Depends
from fastapi import Request
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from app.schemas.pagination import PaginatedResponse
from app.models.contact import Contact
from app.models.company import Company
from app.schemas.contact import ContactCreate, ContactOut, ContactUpdate
from app.db.database import get_db
from app.utils.render_error_response import render_error_response
from app.utils.render_success_response import render_success_response
from app.utils.pagination import paginate

router = APIRouter(prefix="/contacts", tags=["Contacts"])

@router.get("/{contact_id}", response_model=ContactOut)
def get_contact(contact_id: int, db: Session = Depends(get_db)):
    contact = db.query(Contact).options(joinedload(Contact.company)).filter(Contact.id == contact_id).first()
    if not contact:
        return render_error_response(status_code=404, message="Contact not found")
    return render_success_response(
        status_code=200,
        message="Contact fetched successfully",
        data=ContactOut.from_orm(contact).model_dump()
    )

@router.get("/", response_model=PaginatedResponse[ContactOut])
def get_contacts(request: Request, company_id: int = None, search: str = None, db: Session = Depends(get_db)):
    query = db.query(Contact)
    if company_id:
        query = query.filter(Contact.company_id == company_id)
    if search:
        query = query.filter(Contact.name.ilike(f"%{search}%"))
    return paginate(query=query, request=request, pydantic_model=ContactOut, key="contacts")

@router.post("/", response_model=ContactOut)
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    try:
        company = db.query(Company).filter(Company.id == contact.company_id).first()
        if not company:
            return render_error_response(status_code=404, message="Company not found")
        
        new_contact = Contact(name=contact.name, phone=contact.phone, city=contact.city, company_id=contact.company_id)
        db.add(new_contact)
        db.commit()
        db.refresh(new_contact)
        return render_success_response(data=ContactOut.from_orm(new_contact).model_dump(), message="Contact created successfully")
    except Exception as e:
        return render_error_response(status_code=500, message=f"Error creating contact: {str(e)}")

@router.put("/{contact_id}", response_model=ContactOut)
def update_contact(contact_id: int, contact_update: ContactUpdate, db: Session = Depends(get_db)):
    try:
        contact = db.query(Contact).filter(Contact.id == contact_id).first()
        if not contact:
            return render_error_response(status_code=404, message="Contact not found")

        for key, value in contact_update.model_dump(exclude_unset=True).items():
            setattr(contact, key, value)

        db.commit()
        db.refresh(contact)

        return render_success_response(data=ContactOut.from_orm(contact).model_dump(), message="Contact updated successfully")
    except Exception as e:
        return render_error_response(status_code=500, message=f"Error updating contact: {str(e)}")

@router.delete("/{contact_id}")
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    try:
        contact = db.query(Contact).filter(Contact.id == contact_id).first()
        if not contact:
            return render_error_response(status_code=404, message="Contact not found")

        db.delete(contact)
        db.commit()

        return render_success_response(message="Contact deleted successfully")
    except Exception as e:
        return render_error_response(status_code=500, message=f"Error deleting contact: {str(e)}")
