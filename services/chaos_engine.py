from models import Itinerary, DisruptionEvent, Event
import copy

def process_disruption(current_itinerary: Itinerary, disruption: DisruptionEvent) -> Itinerary:
    """
    Simulates the 'Chaos Engine'. Analyzes the disruption and modifies the 
    itinerary accordingly (e.g. replacing an outdoor event with an indoor one if it rains).
    """
    # Create a deep copy to avoid mutating the original request
    new_itinerary = copy.deepcopy(current_itinerary)
    
    # 1. Identify affected events (e.g., events overlapping with the disruption's time/location)
    # For simulation, we'll just check if disruption is 'weather' and replace 'outdoor' events.
    if disruption.type == 'weather' and disruption.severity in ['high', 'medium']:
        for event in new_itinerary.events:
            if 'outdoor' in event.vibe_tags and event.is_flexible:
                # Mock: Reroute to a nearby indoor activity
                event.title = f"Indoor Alternative to {event.title}"
                event.description = "Rerouted due to bad weather detected by Google Maps/Weather API."
                event.vibe_tags.remove('outdoor')
                event.vibe_tags.append('indoor')
                # Modify location slightly to simulate moving to a new place
                event.location.lat += 0.005 
                event.location.lng += 0.005
                event.location.name = "Indoor Museum / Cafe"
                
    elif disruption.type == 'traffic':
        # Push back the start times of subsequent events
        pass # Implementation for traffic delay
        
    return new_itinerary
