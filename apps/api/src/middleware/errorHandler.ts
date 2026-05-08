import type { FastifyReply, FastifyRequest } from 'fastify';
import { ApiError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export function errorHandler(error: Error, _request: FastifyRequest, reply: FastifyReply): void {
  if (error instanceof ApiError) {
    void reply.code(error.statusCode).send({ error: error.message });
    return;
  }

  logger.error({ error }, 'Unhandled API error');
  void reply.code(500).send({ error: 'Internal server error' });
}
