import type { CarbonComparison, ItineraryDay } from '@odyssey/shared';
import { MapsService } from './maps.service.js';

export class CarbonService {
  async calculateTripCarbon(
    itinerary: ItineraryDay[],
    carbonMode: 'eco' | 'balanced' | 'fast',
  ): Promise<number> {
    const activityCarbon = itinerary
      .flatMap((day) => day.activities)
      .reduce((total, activity) => total + activity.carbonKg, 0);

    const modeMultiplier =
      carbonMode === 'eco' ? 0.84 : carbonMode === 'fast' ? 1.16 : 1;

    return Number((activityCarbon * modeMultiplier).toFixed(2));
  }

  async compareRoutes(
    origin: string,
    destination: string,
  ): Promise<CarbonComparison> {
    return new MapsService().computeCarbonRoute(origin, destination);
  }
}
