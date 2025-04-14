from fastapi import FastAPI
from app.api import company, contact
from app.db.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Make sure to allow on trusted origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
app.include_router(company.router, prefix="/api/v1")
app.include_router(contact.router, prefix="/api/v1")
