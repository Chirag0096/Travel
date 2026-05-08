import { describe, expect, it } from 'vitest';
import { defaultTravelDNA } from '@odyssey/shared';
import { TravelDnaService } from '../../apps/api/src/services/travel-dna.service.js';

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
});
