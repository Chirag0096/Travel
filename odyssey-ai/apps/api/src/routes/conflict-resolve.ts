import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { itineraryDaySchema } from '@odyssey/shared';
import { GeminiService } from '../services/gemini.service.js';

export async function registerConflictRoutes(
  app: FastifyInstance,
): Promise<void> {
  const service = new GeminiService();

  app.post('/api/ai/conflict-resolve', async (request, reply) => {
    const body = z
      .object({
        itineraryDays: z.array(itineraryDaySchema),
      })
      .safeParse(request.body);

    if (!body.success) {
      return reply.code(400).send({ message: 'Invalid itineraryDays payload' });
    }

    return service.resolveConflict(body.data.itineraryDays);
  });
}
