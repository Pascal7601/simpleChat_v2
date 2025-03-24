from database.users import User
from utils.response import HTTPError

def find_user(email: str) -> User:
  user = User.objects().filter(email=email).first()
  if not user:
    HTTPError.not_found("user not found")
  return user

def all_users():
  users = User.objects().all()
  return users


def authenticate_user(email, password):
  user = find_user(email)
  if not user.password_hash == password:
    HTTPError.unauthorized("invalid password")
  return user