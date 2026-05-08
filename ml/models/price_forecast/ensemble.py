def ensemble_forecast(lstm_result: dict, prophet_result: dict) -> dict:
    return {
        "forecast": lstm_result["forecast"],
        "trend": prophet_result["trend"],
        "confidence": prophet_result["confidence"],
    }

