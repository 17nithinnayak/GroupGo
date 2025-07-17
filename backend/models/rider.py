from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Rider(BaseModel):
    rider_id: str
    pickup: str
    destination: str = "JSSSTU"
    earliest_time: datetime
    latest_time: datetime
    matched_driver: Optional[str] = None
    matched: Optional[bool] = False
    path: Optional[list[str]] = None