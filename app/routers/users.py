from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.user import User  # ✅ Import User directly


from ..utils import utils
from .. import schemas
from ..services import user_service
from ..dependencies import get_db, verify_token

router = APIRouter()

@router.post("/register", response_model=schemas.Token)
def register_user(background_tasks: BackgroundTasks, user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()  # ✅ Fixed reference
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
         # ✅ Corrected reference to User
        user = db.query(User).filter(User.email == email).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user.verified = True
        db.commit()
        return {"message": "Email verified successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid verification link")
    

@router.get("/protected-route")
def protected_route(token: str = Depends(verify_token), db: Session = Depends(get_db)):
    return {"message": "You have access to this protected route"}
    


