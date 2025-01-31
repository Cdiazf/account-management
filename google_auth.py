import httpx
from fastapi import HTTPException
from config import GOOGLE_CLIENT_ID

GOOGLE_OAUTH_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo"

async def verify_google_token(token: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{GOOGLE_OAUTH_URL}?id_token={token}")
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Invalid Google token")
        return response.json()
