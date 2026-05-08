import { describe, expect, it } from 'vitest';
import { DisruptionService } from '../../apps/api/src/services/disruption.service.js';

describe('DisruptionService', () => {
  it('returns alternatives for medium risk predictions', async () => {
    const service = new DisruptionService();
    const results = await service.predictForDates('Tokyo', '2026-07-12', '2026-07-14');
    expect(results.some((item) => item.probability > 0.35)).toBe(true);
  });
});

