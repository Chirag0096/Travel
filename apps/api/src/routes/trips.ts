import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { moodVectorSchema } from '@odyssey/shared';
import { PlannerService } from '../services/planner.service.js';
import { asApiResponse } from '../utils/helpers.js';

export async function registerTripRoutes(app: FastifyInstance): Promise<void> {
  const plannerService = new PlannerService();

  app.get('/api/trips/:id', async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const trip = plannerService.getTrip(params.id);

    if (!trip) {
      return reply.code(404).send({ message: 'Trip not found' });
    }

    return asApiResponse({
      trip,
      liveDisruptionStatus:
        trip.disruptionAlerts.find((item) => item.riskLevel !== 'low')?.riskLevel ?? 'low',
    });
  });

  app.patch('/api/trips/:id/mood', async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = z.object({ mood: moodVectorSchema }).safeParse(request.body);

    if (!body.success) {
      return reply.code(400).send({ message: 'Invalid mood payload' });
    }

    const trip = plannerService.updateTripMood(params.id, body.data.mood);
    if (!trip) {
      return reply.code(404).send({ message: 'Trip not found' });
    }

    return asApiResponse({
      trip,
      reordered: true,
    });
  });

  app.post('/api/trips/:id/collab/join', async (request) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    return asApiResponse({
      tripId: params.id,
      joined: true,
      collaborationHint: 'Presence and optimistic sync available through Firebase adapters.',
    });
  });
}
