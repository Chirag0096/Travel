import type { FastifyReply, FastifyRequest } from 'fastify';

type Bucket = {
  count: number;
  timestamp: number;
};

const WINDOW_MS = 60_000;
const bucket = new Map<string, Bucket>();

function budgetForPath(path: string): number {
  return path.includes('/plan') ? 100 : 1000;
}

function sweepExpired(now: number): void {
  for (const [key, value] of bucket.entries()) {
    if (now - value.timestamp > WINDOW_MS) {
      bucket.delete(key);
    }
  }
}

export async function rateLimitMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const now = Date.now();
  if (bucket.size > 5_000) {
    sweepExpired(now);
  }

  const key = request.viewer?.id ?? request.ip;
  const endpointBudget = budgetForPath(request.url);
  const existing = bucket.get(key);

  if (!existing || now - existing.timestamp > WINDOW_MS) {
    bucket.set(key, { count: 1, timestamp: now });
    reply.header('X-RateLimit-Limit', endpointBudget.toString());
    reply.header('X-RateLimit-Remaining', (endpointBudget - 1).toString());
    return;
  }

  if (existing.count >= endpointBudget) {
    reply.header('X-RateLimit-Limit', endpointBudget.toString());
    reply.header('X-RateLimit-Remaining', '0');
    await reply.code(429).send({
      message: 'Rate limit exceeded',
    });
    return;
  }

  existing.count += 1;
  reply.header('X-RateLimit-Limit', endpointBudget.toString());
  reply.header('X-RateLimit-Remaining', (endpointBudget - existing.count).toString());
}
