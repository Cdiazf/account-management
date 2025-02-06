from pathlib import Path

from dotenv import load_dotenv
from fastapi_mail import ConnectionConfig, MessageSchema ,FastMail
from passlib.context import CryptContext
from jose import jwt, JWTError
import os
from datetime import datetime, timedelta
from jinja2 import Template



load_dotenv()  # This loads the .env file

conf = ConnectionConfig(
    #use env variable
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_USERNAME"),
    MAIL_PORT=int(os.getenv("MAIL_PORT",587)),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=False 
)


SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    
async def send_verification_email(email: str, token: str):
    verification_link = f"http://localhost:8000/verify-email?token={token}"
    template = Template("""
    <html>
      <body>
        <h2>Email Verification</h2>
        <p>Please click the link below to verify your email:</p>
        <a href="{{ link }}">Verify Email</a>
      </body>
    </html>
    """)
    html_content = template.render(link=verification_link)
    message = MessageSchema(
        subject="Email Verification",
        recipients=[email],
        body=html_content,
        subtype="html"
    )
    fm = FastMail(conf)
    await fm.send_message(message)
