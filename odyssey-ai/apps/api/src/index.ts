import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import Fastify from 'fastify';
import { registerRoutes } from './routes/index.js';
import { authMiddleware } from './middleware/auth.js';
import { rateLimitMiddleware } from './middleware/rateLimit.js';
import { appRouter } from './trpc/router.js';

const app = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  },
});

await app.register(cors, {
  origin: process.env.NEXT_PUBLIC_APP_URL ?? true,
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

app.get('/health', async () => ({
  status: 'ok',
  service: 'odyssey-api',
  timestamp: new Date().toISOString(),
}));

app.get('/trpc/health', async () => ({
  procedures: Object.keys(appRouter._def.procedures),
}));

await registerRoutes(app);

const port = Number(process.env.PORT ?? 4000);
const host =
  process.env.HOST ??
  (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1');
await app.listen({
  port,
  host,
});
