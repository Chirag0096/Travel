import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { buildMockPriceForecast } from '../lib/mock-data.js';

export async function registerForecastRoutes(
  app: FastifyInstance,
): Promise<void> {
  app.get('/api/forecasts/prices', async (request) => {
    const query = z
      .object({
        origin: z.string().default('DEL'),
        destination: z.string().default('BKK'),
        travelDate: z.string().default('2026-07-12'),
      })
      .parse(request.query);

    return buildMockPriceForecast(
      query.origin,
      query.destination,
      query.travelDate,
    );
  });
}

