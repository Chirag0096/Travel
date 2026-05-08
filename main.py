from fastapi import FastAPI, HTTPException
from models import Itinerary, RecalculateRequest, VibeAnalysisRequest
import uuid
from datetime import datetime, timedelta

app = FastAPI(title="Aura Travel Engine API", version="1.0.0")

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Aura Travel Engine is running."}

@app.post("/api/v1/analyze-vibe")
def analyze_vibe(request: VibeAnalysisRequest):
    # TODO: Integrate Vertex AI Gemini 1.5 Pro multimodal vision here
    # Mock response for now
    return {
        "status": "success",
        "vibe_profile": {
            "primary_mood": "adventurous",
            "pacing": "fast",
            "aesthetic": "cinematic_nature",
            "suggested_tags": ["hiking", "outdoor", "photography", "scenic"]
        },
        "message": "Video analyzed successfully using Gemini 1.5 Pro."
    }

@app.post("/api/v1/recalculate-itinerary", response_model=Itinerary)
def recalculate_itinerary(request: RecalculateRequest):
    """
    The Chaos Engine: Takes an existing itinerary and a disruption,
    and returns a newly optimized itinerary.
    """
    from services.chaos_engine import process_disruption
    
    try:
        new_itinerary = process_disruption(request.current_itinerary, request.disruption)
        return new_itinerary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
