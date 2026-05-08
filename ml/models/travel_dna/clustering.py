ARCHETYPES = {
    0: ("Slow Culture Seeker", "Deeply values local stories and calm discovery."),
    1: ("Adrenaline Sprint Traveler", "Seeks movement, challenge, and intensity."),
    2: ("Sustainable Wanderer", "Balances wonder with footprint awareness."),
}


def classify_archetype(dna: dict) -> str:
    if dna.get("culture", 0) > 0.7 and dna.get("pace", 0) < 0.55:
        return ARCHETYPES[0][0]
    if dna.get("adventure", 0) > 0.7:
        return ARCHETYPES[1][0]
    return ARCHETYPES[2][0]

