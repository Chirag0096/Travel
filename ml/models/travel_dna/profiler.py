from .clustering import classify_archetype


class TravelDNAProfiler:
    def initialise_dna(self, onboarding_responses: dict) -> dict:
        return {
            "adventure": onboarding_responses.get("adventure", 0.5),
            "culture": onboarding_responses.get("culture", 0.5),
            "comfort": onboarding_responses.get("comfort", 0.5),
            "pace": onboarding_responses.get("pace", 0.5),
            "social": onboarding_responses.get("social", 0.5),
            "sustainability": onboarding_responses.get("sustainability", 0.5),
            "budget_sensitivity": onboarding_responses.get("budget_sensitivity", 0.5),
            "spontaneity": onboarding_responses.get("spontaneity", 0.5),
        }

    def update_dna_from_trip(self, current_dna: dict, trip_feedback: dict) -> dict:
        next_dna = current_dna.copy()
        next_dna["culture"] = min(
            1.0,
            current_dna.get("culture", 0.5)
            + (0.3 if "culture" in trip_feedback.get("favorite_categories", []) else 0.0),
        )
        next_dna["archetype_name"] = classify_archetype(next_dna)
        return next_dna

