import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { PlannerService } from '../services/planner.service.js';

export async function registerDisruptionRoutes(
  app: FastifyInstance,
): Promise<void> {
  const plannerService = new PlannerService();

  app.get('/api/trips/:id/alternatives', async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const trip = plannerService.getTrip(params.id);

    if (!trip) {
      return reply.code(404).send({ message: 'Trip not found' });
    }

    return {
      alternatives: trip.disruptionAlerts.map((alert) => ({
        id: alert.id,
        type: alert.type,
        summary: alert.summary,
        title: alert.alternativeTitle,
      })),
    };
  });
}

