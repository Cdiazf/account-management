from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, utils
from ..services import user_service
from ..dependencies import get_db

router = APIRouter()

@router.post("/register", response_model=schemas.Token)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(user_service.models.User).filter(user_service.models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = user_service.create_user(db, user)
    access_token = utils.create_access_token({"sub": new_user.email})
    user_data = schemas.UserResponse(
        id=new_user.id, 
        username=new_user.username, 
        email=new_user.email, 
        roles=new_user.roles.split(",")
    )
    return {"access_token": access_token, "token_type": "bearer", "user": user_data, "message": "Registration successful"}

