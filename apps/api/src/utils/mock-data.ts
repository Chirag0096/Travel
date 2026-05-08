import {
  defaultTravelDNA,
  type DisruptionPrediction,
  type ItineraryDay,
  type MoodVector,
  type PriceForecast,
  type PulseZone,
  type TravelDNA,
  type TravelerArchetype,
} from '@odyssey/shared';

export type UserRecord = {
  id: string;
  email: string;
  displayName: string;
  travelDNA: TravelDNA;
  archetype: TravelerArchetype;
};

export type TripRecord = {
  id: string;
  ownerId: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  itinerary: ItineraryDay[];
  disruptionAlerts: DisruptionPrediction[];
  carbonScore: number;
  budgetUsd?: number;
  moodSnapshot?: MoodVector;
};

const demoUser: UserRecord = {
  id: '11111111-1111-1111-1111-111111111111',
  email: 'demo@odyssey.ai',
  displayName: 'Demo Traveler',
  travelDNA: defaultTravelDNA,
  archetype: 'Slow Culture Seeker',
};

export const memoryStore = {
  users: new Map<string, UserRecord>([[demoUser.id, demoUser]]),
  trips: new Map<string, TripRecord>(),
};

export function buildMockPriceForecast(
  origin: string,
  destination: string,
  travelDate: string,
): PriceForecast {
  const points = Array.from({ length: 60 }, (_, index) => ({
    day: index,
    price: Math.round(520 + Math.sin(index / 5) * 45 + index * 0.8),
  }));

  return {
    origin,
    destination,
    travelDate,
    predictedPriceUsd: points[6]?.price ?? 540,
    confidenceIntervalLow: (points[6]?.price ?? 540) - 60,
    confidenceIntervalHigh: (points[6]?.price ?? 540) + 75,
    optimalBookingDaysAhead: 6,
    trend: 'rising',
    points,
  };
}

export function buildPulseZones(placeId: string): PulseZone[] {
  return [
    {
      id: 'zone-1',
      placeId,
      label: 'Old Quarter',
      hour: 18,
      pulseScore: 84,
      crowdLevel: 'high',
      hiddenGems: ['Lantern Courtyard Café', 'Riverside Vinyl Bar'],
      centroid: { lat: 13.7563, lng: 100.5018 },
      polygon: [
        { lat: 13.758, lng: 100.498 },
        { lat: 13.759, lng: 100.503 },
        { lat: 13.754, lng: 100.505 },
        { lat: 13.752, lng: 100.499 },
      ],
    },
    {
      id: 'zone-2',
      placeId,
      label: 'Gallery District',
      hour: 11,
      pulseScore: 63,
      crowdLevel: 'medium',
      hiddenGems: ['Canal Studio Garden', 'Glasshouse Tea Bar'],
      centroid: { lat: 13.744, lng: 100.53 },
      polygon: [
        { lat: 13.746, lng: 100.528 },
        { lat: 13.747, lng: 100.533 },
        { lat: 13.742, lng: 100.535 },
        { lat: 13.741, lng: 100.529 },
      ],
    },
  ];
}
