class DestinationGraphModel:
    def score(self, node_features: list[float]) -> float:
      return sum(node_features) / max(len(node_features), 1)

