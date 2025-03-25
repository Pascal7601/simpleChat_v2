from pydantic import BaseModel

class ChatPost(BaseModel):
  receiver_id: str