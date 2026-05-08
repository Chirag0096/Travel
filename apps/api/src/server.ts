import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import Fastify from 'fastify';
import { registerRoutes } from './routes/index.js';
import { env } from './config/env.js';
import { authMiddleware } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimitMiddleware } from './middleware/rateLimit.js';
import { logger } from './utils/logger.js';

const app = Fastify({
  logger,
});

await app.register(cors, {
  origin: env.NEXT_PUBLIC_APP_URL,
  credentials: true,
});
await app.register(helmet);
await app.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.decorateRequest('viewer', null);
app.addHook('preHandler', authMiddleware);
app.addHook('preHandler', rateLimitMiddleware);
app.setErrorHandler(errorHandler);

app.get('/health', async () => ({
  status: 'ok',
  service: 'odyssey-api',
  timestamp: new Date().toISOString(),
}));

await registerRoutes(app);

await app.listen({
  port: env.PORT,
  host: env.HOST,
});
