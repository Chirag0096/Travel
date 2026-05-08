from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional
import os
from datetime import datetime

# Import ML Engine
from services.ml_engine import generate_crowd_prediction
from services.optimization_engine import optimize_itinerary_route

app = FastAPI(title="Aura Travel Engine API", version="3.0.0")

# --- Pydantic Models for Frontend Integration ---
class Event(BaseModel):
    id: int
    title: str
    cost: float
    type: str
    description: str
    vibe_tags: List[str]
    status: str
    lat: Optional[float] = None
    lon: Optional[float] = None

class DisruptionRequest(BaseModel):
    events: List[Event]
    disruption_type: str

class LocationRequest(BaseModel):
    location: str

# --- API Endpoints ---
@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Aura Travel Engine is running."}

@app.post("/api/v1/predict-crowd")
def predict_crowd(req: LocationRequest):
    """Machine Learning Time-Series Prediction for crowd density."""
    try:
        now = datetime.now()
        predictions = generate_crowd_prediction(req.location, now)
        return {"location": req.location, "time_series": predictions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/recalculate-itinerary", response_model=List[Event])
def recalculate_itinerary(req: DisruptionRequest):
    """
    The Chaos Engine: Takes current events and disruption, 
    returns newly optimized events (Integration with Frontend).
    """
    new_events = []
    for evt in req.events:
        if req.disruption_type == "rain" and "outdoor" in evt.vibe_tags:
            # Apply chaos engine logic
            new_events.append(Event(
                id=evt.id,
                title="Tokyo National Museum (Indoor Reroute)",
                cost=20.0,
                type="Culture",
                description="Rerouted by Aura ML due to detected heavy rain. Experience Japan's rich history instead.",
                vibe_tags=["indoor", "museum", "history"],
                status="resolved"
            ))
        else:
            new_events.append(evt)
    return new_events

@app.post("/api/v1/optimize-route", response_model=List[Event])
def optimize_route(req: DisruptionRequest):
    """Spatial Engine: Reorders events to minimize travel time/distance."""
    try:
        optimized = optimize_itinerary_route(req.events)
        return optimized
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Serve Static Frontend ---
app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")

@app.get("/")
@app.get("/{full_path:path}")
def serve_frontend(full_path: str = ""):
    return FileResponse("frontend/dist/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
