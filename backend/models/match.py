from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class MatchModel(BaseModel):
    rider_id: str
    pickup: str
    path: List[str]

def get_match_collection(db):
    return db["matches"]