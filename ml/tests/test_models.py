from ml.models.travel_dna.clustering import classify_archetype


def test_classify_archetype_returns_string():
    archetype = classify_archetype({"culture": 0.8, "pace": 0.2})
    assert isinstance(archetype, str)
