from pydantic import BaseModel
from typing import Optional

class UserPost(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    avatar: Optional[str]
    status: Optional[str]
    last_seen: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]