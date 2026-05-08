import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../../../apps/api/src/app.js';

describe('API integration: trip and planning flows', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns health payload', async () => {
    const res = await app.inject({ method: 'GET', url: '/health' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.status).toBe('ok');
    expect(body.service).toBe('odyssey-api');
  });

  it('rejects invalid date range in plan endpoint', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/trips/plan',
      payload: {
        destination: 'Tokyo',
        startDate: '2026-09-10T00:00:00.000Z',
        endDate: '2026-09-09T00:00:00.000Z',
        travelerCount: 2,
        preferences: {
          adventure: 0.7,
          culture: 0.8,
          comfort: 0.6,
          sustainability: 0.9,
          food: 0.7,
          pace: 0.5,
        },
        constraints: {
          avoidCrowds: false,
          mobilityRestrictions: false,
          dietaryRestrictions: [],
          maxWalkingKm: 10,
        },
        collaborators: [],
        carbonMode: 'balanced',
      },
    });

    expect(res.statusCode).toBe(400);
    expect(res.json().message).toContain('End date must be after start date');
  });

  it('returns itinerary with disruptions for valid plan request', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/trips/plan',
      payload: {
        destination: 'Tokyo',
        startDate: '2026-09-10T00:00:00.000Z',
        endDate: '2026-09-14T00:00:00.000Z',
        travelerCount: 2,
        budget: 1200,
        mood: { energy: 0.5, anxiety: 0.3, excitement: 0.7 },
        preferences: {
          adventure: 0.7,
          culture: 0.8,
          comfort: 0.6,
          sustainability: 0.9,
          food: 0.7,
          pace: 0.5,
        },
        constraints: {
          avoidCrowds: false,
          mobilityRestrictions: false,
          dietaryRestrictions: [],
          maxWalkingKm: 10,
        },
        collaborators: [],
        carbonMode: 'balanced',
      },
    });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.data.trip.id).toBeTruthy();
    expect(body.data.trip.itinerary.length).toBeGreaterThan(0);
    expect(body.data.disruptions.length).toBeGreaterThan(0);
    expect(body.data.trip.carbonScore).toBeGreaterThan(0);
  });

  it('returns 404 for unknown trip alternatives', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/trips/non-existent/alternatives',
    });

    expect(res.statusCode).toBe(404);
  });

  it('validates mood update payload', async () => {
    const res = await app.inject({
      method: 'PATCH',
      url: '/api/trips/non-existent/mood',
      payload: { mood: { energy: 2 } },
    });

    expect(res.statusCode).toBe(400);
  });

  it('returns pulse endpoints payload shape', async () => {
    const pulse = await app.inject({ method: 'GET', url: '/api/pulse/tokyo-shinjuku' });
    expect(pulse.statusCode).toBe(200);
    const pulseBody = pulse.json();
    expect(pulseBody.data.placeId).toBe('tokyo-shinjuku');
    expect(pulseBody.data.zones.length).toBeGreaterThan(0);

    const heatmap = await app.inject({
      method: 'GET',
      url: '/api/pulse/heatmap?placeId=tokyo-shinjuku',
    });
    expect(heatmap.statusCode).toBe(200);
    expect(heatmap.json().data.type).toBe('FeatureCollection');
  });

  it('returns profile dna and accepts feedback update', async () => {
    const dnaRes = await app.inject({ method: 'GET', url: '/api/profile/dna' });
    expect(dnaRes.statusCode).toBe(200);
    expect(dnaRes.json().data.dna).toBeDefined();

    const feedbackRes = await app.inject({
      method: 'POST',
      url: '/api/profile/feedback',
      payload: {
        favoriteCategories: ['culture', 'food'],
        carbonSensitivity: 0.9,
        paceSatisfaction: 0.45,
        spontaneitySignal: 0.62,
      },
    });
    expect(feedbackRes.statusCode).toBe(200);
    expect(feedbackRes.json().data.archetype).toBeTruthy();
  });

  it('returns destination match and price forecast payloads', async () => {
    const destinationRes = await app.inject({
      method: 'POST',
      url: '/api/destinations/match',
    });
    expect(destinationRes.statusCode).toBe(200);
    expect(destinationRes.json().data.matches.length).toBeGreaterThan(0);

    const forecastRes = await app.inject({
      method: 'GET',
      url: '/api/forecasts/prices?origin=DEL&destination=TYO&travelDate=2026-11-10',
    });
    expect(forecastRes.statusCode).toBe(200);
    expect(forecastRes.json().data.predictedPriceUsd).toBeGreaterThan(0);
  });

  it('returns carbon compare and conflict resolve payloads', async () => {
    const carbonRes = await app.inject({
      method: 'GET',
      url: '/api/carbon/compare?origin=A&destination=B',
    });
    expect(carbonRes.statusCode).toBe(200);
    expect(carbonRes.json().data.routes.length).toBeGreaterThan(0);

    const tripRes = await app.inject({
      method: 'POST',
      url: '/api/trips/plan',
      payload: {
        destination: 'Bangkok',
        startDate: '2026-09-10T00:00:00.000Z',
        endDate: '2026-09-12T00:00:00.000Z',
        travelerCount: 2,
        preferences: {
          adventure: 0.6,
          culture: 0.8,
          comfort: 0.6,
          sustainability: 0.7,
          food: 0.8,
          pace: 0.5,
        },
        constraints: {
          avoidCrowds: false,
          mobilityRestrictions: false,
          dietaryRestrictions: [],
          maxWalkingKm: 10,
        },
        collaborators: [],
        carbonMode: 'balanced',
      },
    });

    const itineraryDays = tripRes.json().data.trip.itinerary;
    const conflictRes = await app.inject({
      method: 'POST',
      url: '/api/ai/conflict-resolve',
      payload: { itineraryDays },
    });

    expect(conflictRes.statusCode).toBe(200);
    expect(conflictRes.json().data.summary).toBeTruthy();
  });
});
