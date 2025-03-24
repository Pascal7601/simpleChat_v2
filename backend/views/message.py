from database.messages import Message
import datetime
from fastapi import WebSocket, WebSocketDisconnect
from typing import List
from fastapi import APIRouter

msg_router = APIRouter()

@msg_router.get('/messages')
def all_messages():
  msgs = Message.objects().all()
  return msgs

@msg_router.post('/ws/messages')
async def websocket_endpoint(
  websocket: WebSocket,
  sender_id: str,
  convo_id: str):
  """send  a message
  """
  await websocket.accept()
  try:
    while True:
      data = await websocket.receive_text()
      new_msg(sender_id, data, convo_id)
      await websocket.send_text(f"Message text was: {data}")
  except WebSocketDisconnect:
    await websocket.close()


def new_msg(sender_id, content, convo_id):
  msg = Message()
  msg.content = content
  msg.timestamp = datetime.datetime.utcnow
  msg.conversation_id = convo_id
  msg.sender_id = sender_id
  msg.save()

def all_messages():
  msgs = Message.objects().all()
  return msgs

def get_msg(msg_id):
  msgs = Message.objects().filter(id=msg_id).all()
  return msgs