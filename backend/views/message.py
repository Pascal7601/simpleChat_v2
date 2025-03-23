from database.messages import Message
import datetime
from utils.response import error_msg, success_msg

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