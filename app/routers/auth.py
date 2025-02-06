from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .. import schemas, utils
from ..services import user_service
from ..dependencies import get_db
import google.auth.transport.requests
import google.oauth2.id_token

router = APIRouter()

@router.post("/login", response_model=schemas.Token)
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = user_service.authenticate_user(db, user.email, user.password)
    
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    # ✅ Check if the user's email is verified
    if not db_user.verified:
        # Generate a new verification token
        verification_token = utils.create_access_token({"sub": db_user.email})
        
        # Send the verification email again
        utils.send_verification_email(db_user.email, verification_token)
        
        raise HTTPException(
            status_code=400,
            detail="Email not verified. A new verification email has been sent. Please verify your email before logging in."
        )
    
    access_token = utils.create_access_token({"sub": db_user.email})
    
    user_data = schemas.UserResponse(
        id=db_user.id, 
        username=db_user.username, 
        email=db_user.email, 
        roles=db_user.roles.split(","),
        verified=db_user.verified
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_data,
        "message": "Login successful"
    }


@router.post("/auth/google")
def google_auth(request: Request):
    token = request.headers.get("Authorization").split(" ")[1]
    try:
        id_info = google.oauth2.id_token.verify_oauth2_token(
            token, google.auth.transport.requests.Request()
        )
        return {"message": "Google authentication successful", "user_info": id_info}
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Google token")
