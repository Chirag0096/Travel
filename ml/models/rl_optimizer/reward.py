def mood_alignment_score(activity: dict, mood: dict) -> float:
    if "calm" in activity.get("mood_tags", []) and mood.get("anxiety", 0) > 0.5:
        return 0.9
    if "energetic" in activity.get("mood_tags", []) and mood.get("energy", 0) > 0.6:
        return 0.85
    return 0.5

