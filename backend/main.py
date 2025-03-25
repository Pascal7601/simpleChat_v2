from database import connection
from database.conversations import Conversation
from database.messages import Message
from database.users import User
from views import services, user, message, conversation
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.include_router(user.user_router)
app.include_router(message.msg_router)
app.include_router(conversation.convo_router)



app.add_middleware(
  CORSMiddleware,
  allow_origins='*',
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get('/')
def home():
  return {"message": "Hello World"}

if __name__ == '__main__':
  import uvicorn
  uvicorn.run('main:app', host="127.0.0.1", port=8002, reload=True)
    



