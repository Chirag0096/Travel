from dataclasses import dataclass


@dataclass
class ProphetForecast:
    trend: str
    confidence: float


def build_prophet_summary() -> ProphetForecast:
    return ProphetForecast(trend="rising", confidence=0.71)

