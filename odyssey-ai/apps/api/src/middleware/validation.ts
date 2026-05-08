import type { FastifyReply, FastifyRequest } from 'fastify';
import { z, type ZodTypeAny } from 'zod';

export async function validateBody<TSchema extends ZodTypeAny>(
  request: FastifyRequest,
  reply: FastifyReply,
  schema: TSchema,
): Promise<z.output<TSchema> | undefined> {
  const result = schema.safeParse(request.body);
  if (!result.success) {
    await reply.code(400).send({
      message: 'Invalid request body',
      issues: result.error.flatten(),
    });
    return undefined;
  }

  return result.data;
}
