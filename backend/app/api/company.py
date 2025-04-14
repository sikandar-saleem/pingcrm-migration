from fastapi import APIRouter, Depends
from fastapi import Request
from sqlalchemy.orm import Session
from typing import List

from app.schemas.pagination import PaginatedResponse
from app.models.company import Company
from app.schemas.company import CompanyCreate, CompanyOut, CompanyUpdate, CompanyOptions
from app.db.database import get_db
from app.utils.render_error_response import render_error_response
from app.utils.render_success_response import render_success_response
from app.utils.pagination import paginate

router = APIRouter(prefix="/companies", tags=["Companies"])

@router.get("/", response_model=PaginatedResponse[CompanyOut])
def get_companies(request: Request, search: str = None, db: Session = Depends(get_db)):
    query = db.query(Company)
    
    if search:
        query = query.filter(Company.name.ilike(f"%{search}%"))

    query = query.order_by(Company.updated_at.desc())
    return paginate(query=query, request=request, pydantic_model=CompanyOut, key="companies")


@router.post("/", response_model=CompanyOut)
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    try:
        new_company = Company(name=company.name, description=company.description, status=company.status)
        db.add(new_company)
        db.commit()
        db.refresh(new_company)
        return render_success_response(data=CompanyOut.from_orm(new_company).model_dump(), message="Company created successfully")
    except Exception as e:
        return render_error_response(status_code=500, message=f"Error creating company: {str(e)}")


@router.put("/{company_id}", response_model=CompanyOut)
def update_company(company_id: int, company_update: CompanyUpdate, db: Session = Depends(get_db)):
    try:
        company = db.query(Company).filter(Company.id == company_id).first()
        if not company:
            return render_error_response(status_code=404, message="Company not found")

        for key, value in company_update.model_dump(exclude_unset=True).items():
            setattr(company, key, value)

        db.commit()
        db.refresh(company)

        return render_success_response(data=CompanyOut.from_orm(company).model_dump(), message="Company updated successfully")
    except Exception as e:
        return render_error_response(status_code=500, message=f"Error updating company: {str(e)}")


@router.delete("/{company_id}")
def delete_company(company_id: int, db: Session = Depends(get_db)):
    try:
        company = db.query(Company).filter(Company.id == company_id).first()
        if not company:
            return render_error_response(status_code=404, message="Company not found")

        db.delete(company)
        db.commit()

        return render_success_response(message="Company deleted successfully")
    except Exception as e:
        return render_error_response(status_code=500, message=f"Error deleting company: {str(e)}")


@router.get("/options", response_model=List[CompanyOptions])
def get_company_options(db: Session = Depends(get_db)):
    companies = db.query(Company.id, Company.name).order_by(Company.name.asc()).all()        
    
    return render_success_response(status_code=200, message="Company options fetched successfully", data=[{"id": c.id, "name": c.name} for c in companies])
    
@router.get("/{company_id}", response_model=CompanyOut)
def get_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.id == company_id).first()

    if not company:
        return render_error_response(status_code=404, message="Company not found")
    
    return render_success_response(status_code=200, message="Company fetched successfully", data=CompanyOut.from_orm(company).model_dump())