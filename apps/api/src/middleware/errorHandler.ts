import type { FastifyReply, FastifyRequest } from 'fastify';
import { ApiError } from '../utils/errors.js';

export function errorHandler(error: Error, request: FastifyRequest, reply: FastifyReply): void {
  if (error instanceof ApiError) {
    void reply.code(error.statusCode).send({ error: error.message });
    return;
  }

  request.log.error({ error }, 'Unhandled API error');
  void reply.code(500).send({ error: 'Internal server error' });
}
