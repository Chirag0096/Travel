import type { FastifyReply, FastifyRequest } from 'fastify';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { env } from '../config/env.js';

const DEMO_VIEWER = {
  id: '11111111-1111-1111-1111-111111111111',
  email: 'demo@odyssey.ai',
  name: 'Demo Traveler',
};

function parseBearerToken(header: string | undefined): string | null {
  if (!header) {
    return null;
  }

  const [scheme, token] = header.trim().split(/\s+/, 2);
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return null;
  }

  return token.trim();
}

function canUseFirebaseVerification(): boolean {
  return Boolean(
    env.FIREBASE_PROJECT_ID &&
      env.FIREBASE_CLIENT_EMAIL &&
      env.FIREBASE_PRIVATE_KEY &&
      !env.FIREBASE_CLIENT_EMAIL.startsWith('dev@') &&
      !env.FIREBASE_PRIVATE_KEY.startsWith('dev-'),
  );
}

function getFirebaseAuth() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      projectId: env.FIREBASE_PROJECT_ID,
    });
  }

  return getAuth();
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const token = parseBearerToken(request.headers.authorization);

  if (!token) {
    if (env.ALLOW_ANON_AUTH) {
      request.viewer = DEMO_VIEWER;
      return;
    }

    await reply.code(401).send({ message: 'Authorization token is required.' });
    return;
  }

  if (token.length < 10) {
    await reply.code(401).send({ message: 'Invalid authorization token.' });
    return;
  }

  if (!canUseFirebaseVerification()) {
    request.viewer = {
      id: token,
      email: 'verified@odyssey.ai',
      name: 'Verified Traveler',
    };
    return;
  }

  try {
    const decoded = await getFirebaseAuth().verifyIdToken(token);
    request.viewer = {
      id: decoded.uid,
      email: decoded.email,
      name: decoded.name,
    };
  } catch {
    await reply.code(401).send({ message: 'Invalid authorization token.' });
  }
}
