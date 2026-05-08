import { env } from '../config/env.js';

export const dbClient = {
  connectionString: env.DATABASE_URL,
};
