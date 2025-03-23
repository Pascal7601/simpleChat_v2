from database.users import User
from utils.response import error_msg, success_msg

def find_user(email: str) -> User:
  user = User.objects().filter(email=email).first()
  if not user:
    print('user does not exist')
    return
  return user

def all_users():
  users = User.objects().all()
  return users

def reload_account(user: User):
  """ reloads account after login or logout
  handles state
  """ 
  if not user:
    error_msg("user not found")
    return

  user.reload()
  success_msg("succesfully logged in")

def authenticate_user(email, password):
  user = find_user(email)
  if not user.password_hash == password:
    error_msg("wrong password")
    return
  return user