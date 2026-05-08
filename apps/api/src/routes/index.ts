import type { FastifyInstance } from 'fastify';
import { registerTripRoutes } from './trips.js';
import { registerAiPlannerRoutes } from './ai-planner.js';
import { registerDisruptionRoutes } from './disruption.js';
import { registerPulseRoutes } from './pulse.js';
import { registerProfileRoutes } from './profile.js';
import { registerDestinationRoutes } from './destinations.js';
import { registerForecastRoutes } from './forecasts.js';
import { registerCarbonRoutes } from './carbon.js';
import { registerConflictRoutes } from './conflict-resolve.js';

export async function registerRoutes(app: FastifyInstance): Promise<void> {
  await registerAiPlannerRoutes(app);
  await registerTripRoutes(app);
  await registerDisruptionRoutes(app);
  await registerPulseRoutes(app);
  await registerProfileRoutes(app);
  await registerDestinationRoutes(app);
  await registerForecastRoutes(app);
  await registerCarbonRoutes(app);
  await registerConflictRoutes(app);
}
