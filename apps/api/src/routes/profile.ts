import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { defaultTravelDNA } from '@odyssey/shared';
import { memoryStore } from '../utils/mock-data.js';
import { TravelDnaService } from '../services/travel-dna.service.js';
import { asApiResponse } from '../utils/helpers.js';

export async function registerProfileRoutes(app: FastifyInstance): Promise<void> {
  const service = new TravelDnaService();

  app.get('/api/profile/dna', async (request) => {
    const userId = request.viewer?.id ?? '11111111-1111-1111-1111-111111111111';
    const user = memoryStore.users.get(userId);
    const dna = user?.travelDNA ?? defaultTravelDNA;
    const archetype = user?.archetype ?? service.classify(dna);

    return asApiResponse({
      dna,
      archetype,
      stats: {
        totalCarbonFootprintKg: 162.4,
        countriesVisited: 12,
        categoryBreakdown: {
          culture: 36,
          food: 24,
          adventure: 18,
          wellness: 12,
        },
      },
    });
  });

  app.post('/api/profile/feedback', async (request) => {
    const body = z
      .object({
        favoriteCategories: z.array(z.string()).default([]),
        carbonSensitivity: z.number().min(0).max(1),
        paceSatisfaction: z.number().min(0).max(1),
        spontaneitySignal: z.number().min(0).max(1),
      })
      .parse(request.body);

    const userId = request.viewer?.id ?? '11111111-1111-1111-1111-111111111111';
    const user = memoryStore.users.get(userId);
    const current = user?.travelDNA ?? defaultTravelDNA;
    const next = service.updateFromFeedback(current, body);
    const archetype = service.classify(next);

    memoryStore.users.set(userId, {
      id: userId,
      email: user?.email ?? 'demo@odyssey.ai',
      displayName: user?.displayName ?? 'Demo Traveler',
      travelDNA: next,
      archetype,
    });

    return asApiResponse({ dna: next, archetype });
  });
}
