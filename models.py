from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Location(BaseModel):
    lat: float
    lng: float
    name: str

class Event(BaseModel):
    id: str
    title: str
    description: str
    start_time: datetime
    end_time: datetime
    location: Location
    is_flexible: bool = True
    vibe_tags: List[str] = []

class Itinerary(BaseModel):
    id: str
    user_id: str
    destination: str
    events: List[Event]
    total_budget: float

class DisruptionEvent(BaseModel):
    type: str = Field(..., description="e.g., 'weather', 'traffic', 'fatigue', 'closure'")
    severity: str = Field(..., description="e.g., 'high', 'medium', 'low'")
    location: Location
    description: str

class RecalculateRequest(BaseModel):
    current_itinerary: Itinerary
    disruption: DisruptionEvent

class VibeAnalysisRequest(BaseModel):
    media_url: str
    destination: str
    days: int
