import mongoengine

class User(mongoengine.Document):
  first_name = mongoengine.StringField()
  last_name = mongoengine.StringField()
  username = mongoengine.StringField(required=True)
  email = mongoengine.StringField(required=True)
  password_hash = mongoengine.StringField(required=True)
  avatar = mongoengine.StringField()
  status = mongoengine.StringField(default='offline')
  last_seen = mongoengine.DateTimeField()