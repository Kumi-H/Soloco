import firebase_admin
from firebase_admin import credentials
import os
from dotenv import load_dotenv

load_dotenv()

key_json = os.getenv("FIREBASE_CREDENTIALS")
credentials_path = os.path.join("app/static/credentials", key_json)

def admin():
    print("パス", credentials_path)
    cred = credentials.Certificate(credentials_path)
    default_app = firebase_admin.initialize_app(cred)
    
    return default_app