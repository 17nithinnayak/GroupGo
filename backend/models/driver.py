from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from backend.models.match import MatchModel

class Driver(BaseModel):
    driver_id: str
    start: str
    destination: str = "JSSSTU"
    departure_time: datetime
    seats_available: int
    matched_riders: Optional[List[MatchModel]] = Field(default_factory=list)

def get_driver_collection(db):
    return db["drivers"]