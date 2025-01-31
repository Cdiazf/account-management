from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
import database, models, schemas, auth, google_auth, utils
from fastapi.security import OAuth2PasswordRequestForm

app = FastAPI()

# Create tables
models.Base.metadata.create_all(bind=database.engine)

@app.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(database.SessionLocal)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = utils.hash_password(user.password)
    new_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.SessionLocal)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not utils.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/google-login", response_model=schemas.Token)
async def google_login(token: str, db: Session = Depends(database.SessionLocal)):
    user_info = await google_auth.verify_google_token(token)
    email = user_info.get("email")

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        user = models.User(email=email, is_google=True)
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=schemas.UserResponse)
def get_current_user(user: models.User = Depends(auth.get_current_user)):
    return user
