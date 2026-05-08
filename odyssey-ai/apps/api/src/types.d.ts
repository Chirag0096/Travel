import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    viewer: {
      id: string;
      email?: string;
      name?: string;
    } | null;
  }
}

