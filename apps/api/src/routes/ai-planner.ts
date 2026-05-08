import type { FastifyInstance } from 'fastify';
import { planTripSchema } from '@odyssey/shared';
import { PlannerService } from '../services/planner.service.js';
import { asApiResponse } from '../utils/helpers.js';

export async function registerAiPlannerRoutes(app: FastifyInstance): Promise<void> {
  const plannerService = new PlannerService();

  app.post('/api/trips/plan', async (request, reply) => {
    const body = planTripSchema.safeParse(request.body);
    if (!body.success) {
      return reply.code(400).send({
        error: 'Invalid request body',
        issues: body.error.flatten(),
      });
    }

    const parsed = body.data;
    if (new Date(parsed.endDate) <= new Date(parsed.startDate)) {
      return reply.code(400).send({
        message: 'End date must be after start date',
      });
    }

    const userId = request.viewer?.id ?? '11111111-1111-1111-1111-111111111111';
    const result = await plannerService.planTrip(parsed, userId);

    return asApiResponse({
      trip: result.trip,
      narrative: result.narrative,
      disruptions: result.trip.disruptionAlerts,
    });
  });
}
