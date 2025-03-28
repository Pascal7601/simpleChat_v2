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
  convos_list = []
  for convo in convos:
      last_msg = convo.last_message.fetch() if convo.last_message else None
      
      convos_list.append({
          'id': str(convo.id),
          'participants': [{'id': str(p.id), 'username': p.username} for p in convo.participants],
          'last_message': {
              'id': str(last_msg.id),
              'content': last_msg.content,
              'timestamp': str(last_msg.timestamp)
          } if last_msg else None,
          'updated_at': str(convo.updated_at)
      })
  
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
      'updated_at': str(existing_convo.updated_at),
      'last_message': existing_convo.last_message.fetch().content if existing_convo.last_message else None
    }
  
  convo = Conversation(participants=participants)
  convo.save()
  return {
    'id': str(convo.id),
    'participants': [{
      'id': str(participant.id),
      'username': participant.username,
      'last_message': None,
    } for participant in convo.participants],
    'updated_at': str(convo.updated_at)
  }