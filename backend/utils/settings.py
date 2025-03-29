from dotenv import load_dotenv
import os

load_dotenv()

secret_key = os.getenv("SECRET_KEY")
algorithm = os.getenv("ALGORITHM")
access_token_expire_minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

supabase_url = os.getenv('SUPABASE_URL')
supabase_api_key = os.getenv('SUPABASE_API_KEY')

mongo_db_url = os.getenv('MONGODB_URL')
print(mongo_db_url)