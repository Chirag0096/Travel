import { describe, expect, it } from 'vitest';
import { CarbonService } from '../../../apps/api/src/services/carbon.service.js';

function itineraryWithCarbon(carbonKg: number) {
  return [
    {
      dayIndex: 0,
      date: '2026-07-12',
      theme: 'Theme',
      activities: [
        {
          id: '1',
          name: 'Activity',
          category: 'culture',
          startTime: '2026-07-12T09:00:00.000Z',
          endTime: '2026-07-12T10:00:00.000Z',
          durationMinutes: 60,
          costUsd: 10,
          carbonKg,
          moodTags: ['calm'],
          rating: 4.8,
          lat: 0,
          lng: 0,
          note: 'note',
        },
      ],
    },
  ];
}

describe('CarbonService', () => {
  it('returns a lower score in eco mode', async () => {
    const service = new CarbonService();
    const balanced = await service.calculateTripCarbon(itineraryWithCarbon(5), 'balanced');
    const eco = await service.calculateTripCarbon(itineraryWithCarbon(5), 'eco');

    expect(eco).toBeLessThan(balanced);
  });

  it('returns a higher score in fast mode than balanced', async () => {
    const service = new CarbonService();
    const balanced = await service.calculateTripCarbon(itineraryWithCarbon(5), 'balanced');
    const fast = await service.calculateTripCarbon(itineraryWithCarbon(5), 'fast');

    expect(fast).toBeGreaterThan(balanced);
  });

  it('compares routes with expected ordering', async () => {
    const service = new CarbonService();
    const comparison = await service.compareRoutes('A', 'B');

    expect(comparison.routes.length).toBeGreaterThanOrEqual(3);
    expect(comparison.routes[0]?.mode).toBe('transit');
  });
});
