import { initTRPC } from '@trpc/server';

const trpc = initTRPC.create();

export const appRouter = trpc.router({
  health: trpc.procedure.query(() => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })),
});

export type AppRouter = typeof appRouter;

