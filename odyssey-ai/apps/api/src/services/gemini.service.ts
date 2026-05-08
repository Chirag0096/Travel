import type {
  ConflictResolutionProposal,
  ItineraryDay,
  MoodVector,
  PlanTripInput,
  TravelDNA,
} from '@odyssey/shared';

export class GeminiService {
  async buildNarrative(
    itinerary: ItineraryDay[],
    input: PlanTripInput,
    travelDNA: TravelDNA,
  ): Promise<string> {
    const leadingMood = input.mood
      ? `energy ${input.mood.energy.toFixed(2)}, anxiety ${input.mood.anxiety.toFixed(2)}`
      : 'balanced energy';

    return [
      `ODYSSEY AI shaped this ${input.destination} plan around ${leadingMood}.`,
      `The itinerary leans into culture ${travelDNA.culture.toFixed(2)} and sustainability ${travelDNA.sustainability.toFixed(2)} while keeping the pace adaptable.`,
      `Across ${itinerary.length} days, the trip alternates calm anchor experiences with high-signal local discoveries to stay resilient against disruption.`,
    ].join(' ');
  }

  async interpretMoodNote(note: string): Promise<MoodVector> {
    const lower = note.toLowerCase();
    if (lower.includes('tired') || lower.includes('anxious')) {
      return { energy: 0.32, anxiety: 0.74, excitement: 0.28 };
    }

    if (lower.includes('thrilled') || lower.includes('celebratory')) {
      return { energy: 0.84, anxiety: 0.18, excitement: 0.92 };
    }

    return { energy: 0.58, anxiety: 0.36, excitement: 0.67 };
  }

  async resolveConflict(
    itineraryDays: ItineraryDay[],
  ): Promise<ConflictResolutionProposal> {
    return {
      summary:
        'The compromise plan preserves one high-energy exploration block and one calmer culinary-cultural block each day.',
      compromiseScore: 87,
      rationale: [
        'Balances adventure and food-led experiences without overscheduling.',
        'Uses lower-crowd morning windows for reflective travelers.',
        'Ends with a shared social anchor to improve group satisfaction.',
      ],
      itineraryDays,
    };
  }
}
