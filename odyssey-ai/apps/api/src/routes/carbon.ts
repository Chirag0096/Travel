import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { CarbonService } from '../services/carbon.service.js';

export async function registerCarbonRoutes(
  app: FastifyInstance,
): Promise<void> {
  const service = new CarbonService();

  app.get('/api/carbon/compare', async (request) => {
    const query = z
      .object({
        origin: z.string().default('Hotel Siam'),
        destination: z.string().default('Old Quarter Night Market'),
      })
      .parse(request.query);

    return service.compareRoutes(query.origin, query.destination);
  });
}

