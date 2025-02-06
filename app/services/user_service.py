from sqlalchemy.orm import Session
from ..utils import utils
from .. import schemas
from ..models.user import User  # ✅ Import the User model correctly

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = utils.get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, password=hashed_password, verified=False)  # ✅ Corrected reference to User model
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    db_user = db.query(User).filter(User.email == email).first()  # ✅ Use 'db_user' instead of overwriting 'user'
    if db_user and utils.verify_password(password, db_user.password):
        return db_user
    return None
