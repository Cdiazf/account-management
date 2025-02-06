from app.utils.utils import is_token_blacklisted
from .database import SessionLocal
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, Request


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Token verification middleware
def verify_token(request: Request, db: Session = Depends(get_db)):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing")

    token = auth_header.split(" ")[1]
    
    if is_token_blacklisted(db, token):
        raise HTTPException(status_code=401, detail="Token is blacklisted")

    return token