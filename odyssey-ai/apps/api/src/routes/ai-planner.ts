import type { FastifyInstance } from 'fastify';
import { planTripSchema } from '@odyssey/shared';
import { validateBody } from '../middleware/validation.js';
import { PlannerService } from '../services/planner.service.js';

export async function registerAiPlannerRoutes(
  app: FastifyInstance,
): Promise<void> {
  const plannerService = new PlannerService();

  app.post('/api/trips/plan', async (request, reply) => {
    const parsed = await validateBody(request, reply, planTripSchema);
    if (!parsed) {
      return;
    }

    if (new Date(parsed.endDate) <= new Date(parsed.startDate)) {
      return reply.code(400).send({
        message: 'End date must be after start date',
      });
    }

    const userId = request.viewer?.id ?? '11111111-1111-1111-1111-111111111111';
    const result = await plannerService.planTrip(parsed, userId);

    return {
      trip: result.trip,
      narrative: result.narrative,
      disruptions: result.trip.disruptionAlerts,
    };
  });
}
