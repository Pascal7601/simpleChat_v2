from database.users import User
from . import services
from fastapi import APIRouter
from utils.response import HTTPError
from schemas.user import UserPost, UserLogin

user_router = APIRouter()

@user_router.post('/register')
def register_user(user: UserPost):
  create_account(user.username, user.email, user.password)
  return {'message': f'Succesfully created an account, proceed to login {user.username}'}

@user_router.post('/login')
def login_user(user: UserLogin):
  user = services.authenticate_user(user.email, user.password)
  return {'message': f'Welcome back {user.username}'}

def create_account(username, email: str, password: str):
  existing_user = User.objects().filter(email=email).first()
  if existing_user:
    HTTPError.not_found("user already exists")
  user = User(username=username, email=email, password_hash=password)
  user.save()



