import type { PulseZone } from '@odyssey/shared';
import { MapsService } from './maps.service.js';

export class PulseService {
  async getPlacePulse(placeId: string): Promise<PulseZone[]> {
    return new MapsService().getNeighbourhoodPulse(placeId);
  }

  toGeoJson(zones: PulseZone[]) {
    return {
      type: 'FeatureCollection' as const,
      features: zones.map((zone) => ({
        type: 'Feature' as const,
        properties: {
          id: zone.id,
          label: zone.label,
          pulseScore: zone.pulseScore,
          crowdLevel: zone.crowdLevel,
          hiddenGems: zone.hiddenGems,
        },
        geometry: {
          type: 'Polygon' as const,
          coordinates: [
            zone.polygon.map((point: { lat: number; lng: number }) => [point.lng, point.lat]),
          ],
        },
      })),
    };
  }
}
