import {
  defaultTravelDNA,
  type TravelDNA,
  type TravelerArchetype,
  travelerArchetypes,
} from '@odyssey/shared';

type FeedbackInput = {
  favoriteCategories: string[];
  carbonSensitivity: number;
  paceSatisfaction: number;
  spontaneitySignal: number;
};

export class TravelDnaService {
  getDefaultProfile(): { dna: TravelDNA; archetype: TravelerArchetype } {
    return {
      dna: defaultTravelDNA,
      archetype: 'Slow Culture Seeker',
    };
  }

  updateFromFeedback(current: TravelDNA, feedback: FeedbackInput): TravelDNA {
    const next = {
      ...current,
      culture: clamp(
        current.culture + (feedback.favoriteCategories.includes('culture') ? 0.08 : 0),
      ),
      adventure: clamp(
        current.adventure + (feedback.favoriteCategories.includes('adventure') ? 0.08 : 0),
      ),
      sustainability: clamp(current.sustainability + (feedback.carbonSensitivity - 0.5) * 0.18),
      pace: clamp(current.pace + (feedback.paceSatisfaction - 0.5) * 0.12),
      spontaneity: clamp(current.spontaneity + (feedback.spontaneitySignal - 0.5) * 0.18),
    };

    return next;
  }

  classify(dna: TravelDNA): TravelerArchetype {
    const ranked = [
      { key: 'Slow Culture Seeker', score: dna.culture + dna.comfort - dna.pace },
      { key: 'Adrenaline Sprint Traveler', score: dna.adventure + dna.pace },
      {
        key: 'Sustainable Wanderer',
        score: dna.sustainability + dna.culture - dna.budgetSensitivity * 0.2,
      },
      { key: 'Luxury Comfort Traveler', score: dna.comfort - dna.budgetSensitivity },
      { key: 'Social Connector', score: dna.social + dna.spontaneity },
      { key: 'Foodie Explorer', score: dna.culture + dna.social * 0.5 },
      { key: 'Spontaneous Adventurer', score: dna.spontaneity + dna.adventure },
      { key: 'Family Orchestrator', score: dna.comfort + (1 - dna.spontaneity) },
    ] as const;

    const winner = ranked.reduce((best, current) => (current.score > best.score ? current : best));

    return (
      travelerArchetypes.find((item: TravelerArchetype) => item === winner.key) ??
      'Slow Culture Seeker'
    );
  }
}

function clamp(value: number): number {
  return Math.max(0, Math.min(1, Number(value.toFixed(3))));
}
