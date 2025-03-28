import mongoengine
import datetime
from .users import User

class Conversation(mongoengine.Document):
  participants = mongoengine.ListField(mongoengine.ReferenceField(User))
  last_message = mongoengine.LazyReferenceField("Message", null=True)
  updated_at = mongoengine.DateTimeField(default=datetime.datetime.utcnow)