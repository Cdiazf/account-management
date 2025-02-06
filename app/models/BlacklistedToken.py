# models.py
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from ..database import Base

class BlacklistedToken(Base):
    __tablename__ = "blacklisted_tokens"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String(255), unique=True, nullable=False)  # ✅ Specify length here
    blacklisted_at = Column(DateTime, default=datetime.utcnow)
