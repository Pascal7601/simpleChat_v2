from database.users import User
from . import services
from fastapi import APIRouter
from utils.response import HTTPError
from schemas.user import UserPost, UserLogin, UserResponse, UserUpdate
from auth.auth import AuthHandler, security
from fastapi.encoders import jsonable_encoder
from typing import List
from fastapi import Depends
from fastapi.security import HTTPBasicCredentials

user_router = APIRouter()

@user_router.post('/register')
def register_user(user: UserPost):
  create_account(user.username, user.email, user.password)
  return {'message': f'Succesfully created an account, proceed to login {user.username}'}

@user_router.post('/login')
def login_user(user: UserLogin):
  user = services.authenticate_user(user.email, user.password)
  token = AuthHandler().create_access_token(str(user.id))
  return {'token': f'{token}', 'token_type': 'bearer'}

@user_router.get('/users', response_model=List[UserResponse])
def all_users():
  users = User.objects().all()
  users_list = [
    {
      'id': str(user.id),
      'username': user.username,
      'email': user.email,
      'avatar': user.avatar,
      'status': user.status,
      'last_seen': str(user.last_seen),
      'first_name': user.first_name,
      'last_name': user.last_name
    }
    for user in users
  ]
  return users_list

@user_router.get('/me')
def get_me(credentials: HTTPBasicCredentials = Depends(security)):
  payload = AuthHandler().decode_token(credentials.credentials)
  user = User.objects().filter(id=payload.get('user_id')).first()
  return {
    'id': str(user.id),
    'username': user.username,
    'email': user.email,
    'avatar': user.avatar,
    'status': user.status,
    'last_seen': str(user.last_seen),
    'first_name': user.first_name,
    'last_name': user.last_name
  }

@user_router.put('/users/me')
def update_user(
  user:UserUpdate,
  credentials: HTTPBasicCredentials = Depends(security)
  ):
  payload = AuthHandler().decode_token(credentials.credentials)
  existing_user = User.objects().filter(id=payload.get('user_id')).first()
  if not existing_user:
    raise HTTPError.not_found("user not found")
  
  updated_data = user.dict()
  existing_user.update(**updated_data)
  existing_user.reload()
  return existing_user


def create_account(username, email: str, password: str):
  existing_user = User.objects().filter(email=email).first()
  if existing_user:
    HTTPError.not_found("user already exists")
  user = User(username=username, email=email, password_hash=password)
  user.save()





