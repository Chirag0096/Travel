from .model import DestinationGraphModel


def rank_destinations(features: list[list[float]]) -> list[float]:
    model = DestinationGraphModel()
    return [model.score(item) for item in features]

