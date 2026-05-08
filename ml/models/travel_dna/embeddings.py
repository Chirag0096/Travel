def embed_preferences(preferences: dict) -> list[float]:
    ordered = [
        preferences.get("adventure", 0.5),
        preferences.get("culture", 0.5),
        preferences.get("comfort", 0.5),
        preferences.get("pace", 0.5),
        preferences.get("social", 0.5),
        preferences.get("sustainability", 0.5),
        preferences.get("budget_sensitivity", 0.5),
        preferences.get("spontaneity", 0.5),
    ]
    return ordered

