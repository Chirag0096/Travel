import type { FastifyInstance } from 'fastify';
import { asApiResponse } from '../utils/helpers.js';

export async function registerDestinationRoutes(app: FastifyInstance): Promise<void> {
  app.post('/api/destinations/match', async () => {
    return asApiResponse({
      matches: [
        {
          id: 'dest-1',
          name: 'Ko Lanta, Thailand',
          confidence: 0.92,
          summary: 'Tropical coastline with calm beach energy and low-friction pacing.',
          photoUrl:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        },
        {
          id: 'dest-2',
          name: 'Da Nang, Vietnam',
          confidence: 0.84,
          summary: 'Coastal city with strong food, design, and day-trip variety.',
          photoUrl:
            'https://images.unsplash.com/photo-1526481280695-3c4691f6e3f8?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    });
  });
}
