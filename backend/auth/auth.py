import jwt
from utils import settings
from utils.response import HTTPError
from fastapi.security import HTTPBearer
from datetime import datetime, timedelta

security = HTTPBearer()

class AuthHandler:
  def __init__(self):
    self.secret = settings.secret_key
    self.algorithm = settings.algorithm
    self.access_token_expire_minutes = settings.access_token_expire_minutes

  def encode_token(self, user_id):
    expiry = datetime.utcnow() + timedelta(minutes=self.access_token_expire_minutes)
    payload = {
      'user_id': user_id,
      'exp': expiry
    }
    token = jwt.encode(payload, self.secret, algorithm=self.algorithm)
    return token
  
  def decode_token(self, token):
    try:
      payload = jwt.decode(token, self.secret, algorithms=[self.algorithm])
      return payload
    except jwt.ExpiredSignatureError:
      HTTPError.unauthorized("token expired")
    except jwt.InvalidTokenError:
      HTTPError.unauthorized("invalid token")
    except Exception:
      HTTPError.unauthorized("invalid token")
  
  def create_access_token(self, email):
    return self.encode_token(email)