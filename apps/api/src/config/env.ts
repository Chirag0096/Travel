import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3001),
  HOST: z.string().default('0.0.0.0'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/postgres'),
  GEMINI_API_KEY: z.string().default('dev-gemini-key'),
  GOOGLE_MAPS_API_KEY: z.string().default('dev-maps-key'),
  VERTEX_AI_PROJECT_ID: z.string().default('dev-project'),
  VERTEX_AI_LOCATION: z.string().default('us-central1'),
  GOOGLE_TRANSLATE_API_KEY: z.string().default('dev-translate-key'),
  FIREBASE_PROJECT_ID: z.string().default('dev-firebase-project'),
  FIREBASE_CLIENT_EMAIL: z.string().default('dev@odyssey.ai'),
  FIREBASE_PRIVATE_KEY: z.string().default('dev-private-key'),
  REDIS_URL: z.string().default('https://example.upstash.io'),
  ALGOLIA_APP_ID: z.string().default('DEVALGOLIA'),
  ALGOLIA_API_KEY: z.string().default('dev-algolia-key'),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`,
  );
}

export const env = parsed.data;
