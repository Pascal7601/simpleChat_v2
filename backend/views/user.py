from database.users import User
from . import services
from utils.response import error_msg, success_msg

def create_account(username, email: str, password: str):
  existing_user = services.find_user(email)
  if existing_user:
    error_msg("user already exists")
  user = User(username=username, email=email, password_hash=password)
  user.save()
  success_msg(f'Succesfully created an account, proceed to login {user.username}')

def login(email: str, password: str):
  user = services.authenticate_user(email, password)
  services.reload_account(user)
  return user

