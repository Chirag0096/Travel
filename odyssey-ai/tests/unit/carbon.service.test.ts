import { describe, expect, it } from 'vitest';
import { CarbonService } from '../../apps/api/src/services/carbon.service.js';

describe('CarbonService', () => {
  it('returns a lower score in eco mode', async () => {
    const service = new CarbonService();
    const itinerary = [
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
            carbonKg: 5,
            moodTags: ['calm'],
            rating: 4.8,
            lat: 0,
            lng: 0,
            note: 'note',
          },
        ],
      },
    ];

    const balanced = await service.calculateTripCarbon(itinerary, 'balanced');
    const eco = await service.calculateTripCarbon(itinerary, 'eco');

    expect(eco).toBeLessThan(balanced);
  });
});

