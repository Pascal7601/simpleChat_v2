from database.conversations import Conversation
from fastapi import APIRouter, Depends
from fastapi.security import HTTPBasicCredentials
from auth.auth import security, AuthHandler
from utils.response import HTTPError
from database.users import User
from bson import ObjectId
from schemas.chat import ChatPost

convo_router = APIRouter()

@convo_router.get('/chats')
def all_conversations(credentials: HTTPBasicCredentials = Depends(security)):
  payload = AuthHandler().decode_token(credentials.credentials)
  user_id = payload.get('user_id')
  convos = Conversation.objects().filter(participants=user_id).all()
  convos_list = [
    {
      'id': str(convo.id),
      'participants': [{
        'id': str(participant.id),
        'username': participant.username,
      } for participant in convo.participants],
      'updated_at': str(convo.updated_at)
    }
    for convo in convos
  ]
  return convos_list

@convo_router.post('/chats/new')
def new_chat(
  receiver: ChatPost,
  credentials: HTTPBasicCredentials = Depends(security)
  ):
  payload = AuthHandler().decode_token(credentials.credentials)
  sender_id = payload.get('user_id')
  
  sender = User.objects().filter(id=ObjectId(sender_id)).first()
  receiver = User.objects().filter(id=ObjectId(receiver.receiver_id)).first()

  if not receiver or not sender:
    raise HTTPError.not_found("user not found")

  participants = [sender, receiver]

  existing_convo = Conversation.objects.filter(
        participants__all=participants, participants__size=len(participants)
    ).first()
  if existing_convo:
    return {
      'id': str(existing_convo.id),
      'participants': [{
        'id': str(participant.id),
        'username': participant.username,
      } for participant in existing_convo.participants],
      'updated_at': str(existing_convo.updated_at)
    }
  
  convo = Conversation(participants=participants)
  convo.save()
  return {
    'id': str(convo.id),
    'participants': [{
      'id': str(participant.id),
      'username': participant.username,
    } for participant in convo.participants],
    'updated_at': str(convo.updated_at)
  }