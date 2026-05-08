import { describe, expect, it } from 'vitest';
import { DisruptionService } from '../../../apps/api/src/services/disruption.service.js';

describe('DisruptionService', () => {
  it('classifies medium/high risk with alternatives when probability > 0.35', async () => {
    const service = new DisruptionService();
    const results = await service.predictForDates('Tokyo', '2026-07-12', '2026-07-14');

    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.probability > 0.35)).toBe(true);
    expect(results.some((item) => item.riskLevel === 'medium' || item.riskLevel === 'high')).toBe(
      true,
    );
  });

  it('keeps all probabilities within [0,1]', async () => {
    const service = new DisruptionService();
    const results = await service.predictForDates('Paris', '2026-08-01', '2026-08-04');

    for (const item of results) {
      expect(item.probability).toBeGreaterThanOrEqual(0);
      expect(item.probability).toBeLessThanOrEqual(1);
    }
  });
});
