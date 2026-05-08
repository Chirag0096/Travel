def extract_segment_features(segment: dict) -> dict:
    return {
        "hour_of_day": segment.get("hour_of_day", 8),
        "day_of_week": segment.get("day_of_week", 2),
        "month": segment.get("month", 7),
        "days_until_travel": segment.get("days_until_travel", 12),
        "historical_delay_rate_route_90d": segment.get("historical_delay_rate_route_90d", 0.18),
        "historical_delay_rate_airline_90d": segment.get("historical_delay_rate_airline_90d", 0.15),
        "weather_severity_origin": segment.get("weather_severity_origin", 0.2),
        "weather_severity_destination": segment.get("weather_severity_destination", 0.4),
        "air_traffic_index": segment.get("air_traffic_index", 0.66),
        "strike_risk_score": segment.get("strike_risk_score", 0.05),
        "season_peak_index": segment.get("season_peak_index", 0.52),
        "holiday_proximity_days": segment.get("holiday_proximity_days", 14),
    }

