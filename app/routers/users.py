from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, utils
from ..services import user_service
from ..dependencies import get_db

router = APIRouter()

@router.post("/register", response_model=schemas.Token)
def register_user(background_tasks: BackgroundTasks, user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(user_service.models.User).filter(user_service.models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = user_service.create_user(db, user)
    access_token = utils.create_access_token({"sub": new_user.email})

    # ✅ Send email in the background
    verification_token = utils.create_access_token({"sub": new_user.email})
    background_tasks.add_task(utils.send_verification_email, new_user.email, verification_token)

    user_data = schemas.UserResponse(
        id=new_user.id, 
        username=new_user.username, 
        email=new_user.email, 
        roles=new_user.roles.split(","),
        verified=new_user.verified
    )
    
    return {"access_token": access_token, "token_type": "bearer", "user": user_data, "message": "Registration successful. Verification email sent."}


@router.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    try:
        payload = utils.decode_access_token(token)
        email = payload.get("sub")
        user = db.query(user_service.models.User).filter(user_service.models.User.email == email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user.verified = True
        db.commit()
        return {"message": "Email verified successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid verification link")
    


