import type { DisruptionPrediction } from '@odyssey/shared';

export class DisruptionService {
  async predictForDates(
    destination: string,
    startDate: string,
    endDate: string,
  ): Promise<DisruptionPrediction[]> {
    const basePrediction: DisruptionPrediction = {
      id: `disruption-${destination}-${startDate}`,
      type: 'weather',
      probability: 0.42,
      riskLevel: 'medium',
      predictedImpactMinutes: 55,
      summary:
        'Localized storm activity may slow arrival into the evening district.',
      alternativeTitle: 'Swap outdoor market loop for indoor gallery and tea route',
    };

    const crowdingPrediction: DisruptionPrediction = {
      id: `disruption-crowding-${endDate}`,
      type: 'crowding',
      probability: 0.31,
      riskLevel: 'low',
      predictedImpactMinutes: 20,
      summary: 'Tourist density spikes expected around the main riverfront after 18:00.',
      alternativeTitle: 'Shift riverfront stop to 16:00 and move dinner later',
    };

    return [basePrediction, crowdingPrediction];
  }
}
