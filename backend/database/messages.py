import mongoengine
from .users import User

class Message(mongoengine.Document):
  sender_id = mongoengine.ReferenceField(User)
  conversation_id = mongoengine.LazyReferenceField("Conversation")
  content = mongoengine.StringField()
  timestamp = mongoengine.DateTimeField()
  status = mongoengine.StringField(choices=['sent', 'delivered', 'read'], default='sent')

  meta = {"collection": "messages"} 
