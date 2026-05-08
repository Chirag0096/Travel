import math
import random
from datetime import datetime, timedelta

def generate_crowd_prediction(location: str, base_date: datetime):
    """
    Simulates a Time-Series Machine Learning model predicting crowd levels
    for a given location over a 12-hour period (e.g., 8 AM to 8 PM).
    Uses a bimodal distribution (morning rush, evening rush) + noise.
    """
    predictions = []
    # Start at 8 AM
    start_time = base_date.replace(hour=8, minute=0, second=0, microsecond=0)
    
    for i in range(13): # 8 AM to 8 PM
        current_time = start_time + timedelta(hours=i)
        hour = current_time.hour
        
        # Base crowd logic: peak at 10 AM (10) and 5 PM (17)
        if location.lower() == "shinjuku":
            # Urban area: Huge evening peak
            base_crowd = 30 + 40 * math.exp(-0.5 * ((hour - 18) / 2.0)**2) + 20 * math.exp(-0.5 * ((hour - 9) / 1.5)**2)
        elif "hike" in location.lower() or "takao" in location.lower():
            # Nature: Morning peak, tapers off
            base_crowd = 20 + 50 * math.exp(-0.5 * ((hour - 10) / 2.5)**2)
        else:
            # Generic bimodal
            base_crowd = 25 + 30 * math.exp(-0.5 * ((hour - 12) / 3.0)**2)
            
        # Add "ML Model" noise (simulating real-time variance)
        noise = random.uniform(-5, 5)
        final_prediction = max(0, min(100, int(base_crowd + noise)))
        
        predictions.append({
            "time": f"{hour:02d}:00",
            "predicted_crowd_density": final_prediction,
            "historical_average": max(0, int(base_crowd))
        })
        
    return predictions
