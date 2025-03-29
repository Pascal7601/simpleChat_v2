from . import settings
from supabase import create_client, Client

supab = create_client(settings.supabase_url, settings.supabase_api_key)
print(supab)
try:
  supab.storage.create_bucket(
    'avatars',
    options={
      'public': True,
      'allowed_mime_types': ['image/png', 'image/jpg', 'image/jpeg'],
      'file_size_limit': 10485760
    })
  print('succesfully created a bucket')
except Exception as e:
  print('unable to create bucket', str(e))