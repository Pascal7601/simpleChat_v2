from database.messages import Message
import datetime
from fastapi import WebSocket, WebSocketDisconnect, Depends
from typing import List
from fastapi import APIRouter
from fastapi.security import  HTTPBasicCredentials
from auth.auth import security, AuthHandler
from utils.response import HTTPError
from fastapi.encoders import jsonable_encoder
import json
from bson import ObjectId


msg_router = APIRouter()

@msg_router.get('/messages')
def all_messages():
  msgs = Message.objects().all()
  return jsonable_encoder(msgs)
# Store active WebSocket connections per conversation
active_connections = {}

@msg_router.websocket('/ws/message/{convo_id}/{sender_id}')
async def websocket_endpoint(websocket: WebSocket, convo_id: str, sender_id: str):
    await websocket.accept()

    # Store connection
    if convo_id not in active_connections:
        active_connections[convo_id] = []
    active_connections[convo_id].append(websocket)

    try:
        while True:
            # Receive message
            data = await websocket.receive_text()
            msg_data = json.loads(data)

            message = Message(
                sender_id=ObjectId(sender_id),
                conversation_id=ObjectId(convo_id),
                content=msg_data["content"],
                timestamp=str(datetime.datetime.now())
            )
            message.save()

            # Broadcast message to all participants
            for connection in active_connections[convo_id]:
                await connection.send_text(json.dumps({
                    "sender_id": sender_id,
                    "message": msg_data["content"],
                    "convo_id": convo_id,
                    "created_at": message.timestamp
                }))

    except WebSocketDisconnect:
        active_connections[convo_id].remove(websocket)
        await websocket.close()

def all_messages():
  msgs = Message.objects().all()
  return msgs

def get_msg(msg_id):
  msgs = Message.objects().filter(id=msg_id).all()
  return msgs