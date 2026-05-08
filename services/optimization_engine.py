import math

def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculate the great circle distance between two points on the earth."""
    # Simplified Euclidean for mock spatial engine
    return math.sqrt((lat2 - lat1)**2 + (lon2 - lon1)**2)

def optimize_itinerary_route(events: list):
    """
    Simulates a Spatial Optimization Engine (like TSP - Traveling Salesperson).
    It reorders the itinerary events to minimize transit distance.
    """
    if not events or len(events) <= 1:
        return events
        
    # Assign mock coordinates if not present
    mock_coords = {
        "Hike": (35.6268, 139.2682), # Mt Takao (Far West)
        "Lunch": (35.6938, 139.7034), # Shinjuku (Center)
        "walk": (35.6580, 139.7016), # Shibuya (Center South)
        "Museum": (35.7190, 139.7732) # Ueno (North East)
    }
    
    for evt in events:
        evt_title = evt.title.lower()
        if "hike" in evt_title or "takao" in evt_title:
            evt.lat, evt.lon = mock_coords["Hike"]
        elif "sushi" in evt_title or "shinjuku" in evt_title:
            evt.lat, evt.lon = mock_coords["Lunch"]
        elif "shibuya" in evt_title:
            evt.lat, evt.lon = mock_coords["walk"]
        else:
            evt.lat, evt.lon = mock_coords["Museum"]
            
    # Simple nearest neighbor heuristic for optimization
    start_event = events[0] # Assume the first event is fixed (e.g. morning start)
    unvisited = events[1:]
    optimized_route = [start_event]
    
    current_node = start_event
    while unvisited:
        # Find nearest unvisited node
        nearest = min(unvisited, key=lambda x: calculate_distance(current_node.lat, current_node.lon, x.lat, x.lon))
        optimized_route.append(nearest)
        unvisited.remove(nearest)
        current_node = nearest
        
    # Add a "Transit Optimized" flag
    for evt in optimized_route:
        evt.description += " [Spatial Node Optimized]"
        
    return optimized_route
