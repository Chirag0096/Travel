import { describe, expect, it } from 'vitest';
import { defaultTravelDNA } from '@odyssey/shared';
import { TravelDnaService } from '../../../apps/api/src/services/travel-dna.service.js';

describe('TravelDnaService', () => {
  it('updates DNA within bounds', () => {
    const service = new TravelDnaService();
    const next = service.updateFromFeedback(defaultTravelDNA, {
      favoriteCategories: ['culture'],
      carbonSensitivity: 1,
      paceSatisfaction: 0.8,
      spontaneitySignal: 0.4,
    });

    Object.values(next).forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    });
  });

  it('classifies sustainability-heavy culture profile consistently', () => {
    const service = new TravelDnaService();
    const archetype = service.classify({
      ...defaultTravelDNA,
      culture: 0.95,
      pace: 0.2,
      spontaneity: 0.25,
    });

    expect(archetype).toBe('Sustainable Wanderer');
  });

  it('returns default profile with archetype and dna', () => {
    const service = new TravelDnaService();
    const profile = service.getDefaultProfile();

    expect(profile.dna).toBeDefined();
    expect(profile.archetype.length).toBeGreaterThan(0);
  });
});
