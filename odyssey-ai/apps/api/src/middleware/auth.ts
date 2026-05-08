import type { FastifyReply, FastifyRequest } from 'fastify';

export async function authMiddleware(
  request: FastifyRequest,
  _reply: FastifyReply,
): Promise<void> {
  const header = request.headers.authorization;

  if (!header) {
    request.viewer = {
      id: '11111111-1111-1111-1111-111111111111',
      email: 'demo@odyssey.ai',
      name: 'Demo Traveler',
    };
    return;
  }

  const token = header.replace('Bearer ', '').trim();
  request.viewer = {
    id: token || '11111111-1111-1111-1111-111111111111',
    email: 'verified@odyssey.ai',
    name: 'Verified Traveler',
  };
}

