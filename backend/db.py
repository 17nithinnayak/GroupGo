from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI not found in .env")

client = AsyncIOMotorClient(MONGO_URI)
db = client["groupgo"]

driver_collection = db["drivers"]
rider_collection = db["riders"]
match_collection = db["matches"]

def get_database():
    return db
