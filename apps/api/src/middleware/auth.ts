import type { FastifyReply, FastifyRequest } from 'fastify';
import { env } from '../config/env.js';

const DEMO_VIEWER = {
  id: '11111111-1111-1111-1111-111111111111',
  email: 'demo@odyssey.ai',
  name: 'Demo Traveler',
};

function parseBearerToken(header: string | undefined): string | null {
  if (!header) {
    return null;
  }

  const [scheme, token] = header.trim().split(/\s+/, 2);
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return null;
  }

  return token.trim();
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const token = parseBearerToken(request.headers.authorization);

  if (!token) {
    if (env.ALLOW_ANON_AUTH) {
      request.viewer = DEMO_VIEWER;
      return;
    }

    await reply.code(401).send({ message: 'Authorization token is required.' });
    return;
  }

  if (token.length < 10) {
    await reply.code(401).send({ message: 'Invalid authorization token.' });
    return;
  }

  request.viewer = {
    id: token,
    email: 'verified@odyssey.ai',
    name: 'Verified Traveler',
  };
}
