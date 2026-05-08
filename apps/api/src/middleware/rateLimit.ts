import type { FastifyReply, FastifyRequest } from 'fastify';

const bucket = new Map<string, { count: number; timestamp: number }>();

export async function rateLimitMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const key = request.viewer?.id ?? request.ip;
  const now = Date.now();
  const existing = bucket.get(key);
  const endpointBudget = request.url.includes('/plan') ? 100 : 1000;

  if (!existing || now - existing.timestamp > 60_000) {
    bucket.set(key, { count: 1, timestamp: now });
    return;
  }

  if (existing.count >= endpointBudget) {
    await reply.code(429).send({
      message: 'Rate limit exceeded',
    });
    return;
  }

  existing.count += 1;
}
