from mongoengine import connect, disconnect
from utils import settings

uri = settings.mongo_db_url

try:
  connect(db='chatapp', host=uri)
  print('succesfully connected to atlas')
except Exception as e:
  print('error connecting to atlas', str(e))

