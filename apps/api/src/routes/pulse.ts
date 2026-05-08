import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { PulseService } from '../services/pulse.service.js';
import { asApiResponse } from '../utils/helpers.js';

export async function registerPulseRoutes(app: FastifyInstance): Promise<void> {
  const pulseService = new PulseService();

  app.get('/api/pulse/heatmap', async (request) => {
    const query = z
      .object({ placeId: z.string().default('mock-place-bangkok') })
      .parse(request.query);
    const zones = await pulseService.getPlacePulse(query.placeId);
    return asApiResponse(pulseService.toGeoJson(zones));
  });

  app.get('/api/pulse/:placeId', async (request) => {
    const params = z.object({ placeId: z.string() }).parse(request.params);
    const zones = await pulseService.getPlacePulse(params.placeId);

    return asApiResponse({
      placeId: params.placeId,
      averagePulseScore: Math.round(
        zones.reduce((total, zone) => total + zone.pulseScore, 0) / zones.length,
      ),
      zones,
    });
  });
}
