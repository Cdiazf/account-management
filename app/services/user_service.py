from sqlalchemy.orm import Session
from .. import models, schemas, utils

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = utils.get_password_hash(user.password)
    db_user = models.User(username=user.username, email=user.email, password=hashed_password, verified=False)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(models.User).filter(models.User.email == email).first()
    if user and utils.verify_password(password, user.password):
        return user
    return None