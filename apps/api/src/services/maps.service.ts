import type { CarbonComparison, ItineraryActivity, MoodVector, PulseZone } from '@odyssey/shared';
import { env } from '../config/env.js';
import { buildPulseZones } from '../utils/mock-data.js';

type DestinationContext = {
  id: string;
  placeId: string;
  name: string;
  lat: number;
  lng: number;
  country: string;
  city: string;
  streetViewUrl: string;
};

type ActivityOptions = {
  preferences: Record<string, number>;
  constraints: {
    avoidCrowds: boolean;
    mobilityRestrictions: boolean;
    dietaryRestrictions: string[];
    maxWalkingKm: number;
  };
};

export class MapsService {
  async getDestinationContext(destination: string): Promise<DestinationContext> {
    return {
      id: 'dest-bangkok',
      placeId: 'mock-place-bangkok',
      name: destination,
      lat: 13.7563,
      lng: 100.5018,
      country: 'Thailand',
      city: 'Bangkok',
      streetViewUrl: `https://maps.googleapis.com/maps/api/streetview?size=800x400&location=13.7563,100.5018&key=${env.GOOGLE_MAPS_API_KEY}`,
    };
  }

  async getNearbyActivities(
    lat: number,
    lng: number,
    _options: ActivityOptions,
  ): Promise<ItineraryActivity[]> {
    const baseActivities: Array<Omit<ItineraryActivity, 'startTime' | 'endTime'>> = [
      {
        id: 'activity-1',
        name: 'Canal-side breakfast tasting',
        category: 'food',
        durationMinutes: 75,
        costUsd: 18,
        carbonKg: 1.2,
        moodTags: ['calm', 'local', 'gentle'],
        rating: 4.8,
        lat,
        lng,
        note: 'Quiet local breakfast with strong sustainability fit.',
      },
      {
        id: 'activity-2',
        name: 'Temple art and history circuit',
        category: 'culture',
        durationMinutes: 120,
        costUsd: 22,
        carbonKg: 2.1,
        moodTags: ['inspiring', 'reflective', 'calm'],
        rating: 4.9,
        lat: lat + 0.006,
        lng: lng + 0.008,
        note: 'Excellent match for culture-heavy and lower-anxiety mornings.',
      },
      {
        id: 'activity-3',
        name: 'Rooftop sunset social lounge',
        category: 'social',
        durationMinutes: 90,
        costUsd: 36,
        carbonKg: 2.8,
        moodTags: ['social', 'celebratory', 'energetic'],
        rating: 4.6,
        lat: lat + 0.011,
        lng: lng - 0.007,
        note: 'Strong fit when energy and excitement are high.',
      },
      {
        id: 'activity-4',
        name: 'Hidden gallery lane walk',
        category: 'culture',
        durationMinutes: 60,
        costUsd: 12,
        carbonKg: 0.8,
        moodTags: ['inspiring', 'calm'],
        rating: 4.7,
        lat: lat - 0.004,
        lng: lng + 0.01,
        note: 'Low-crowd cultural option with short walking segments.',
      },
      {
        id: 'activity-5',
        name: 'Night market micro-route',
        category: 'adventure',
        durationMinutes: 110,
        costUsd: 28,
        carbonKg: 1.9,
        moodTags: ['social', 'exciting', 'local'],
        rating: 4.7,
        lat: lat + 0.013,
        lng: lng + 0.014,
        note: 'High-energy exploration and food discovery loop.',
      },
      {
        id: 'activity-6',
        name: 'Botanical reset and tea ritual',
        category: 'wellness',
        durationMinutes: 80,
        costUsd: 20,
        carbonKg: 0.6,
        moodTags: ['calm', 'reflective', 'restorative'],
        rating: 4.8,
        lat: lat - 0.008,
        lng: lng - 0.006,
        note: 'Best used when the traveler is tired or anxious.',
      },
    ];

    return baseActivities.map((activity, index) => ({
      ...activity,
      startTime: `2026-05-${String(10 + Math.floor(index / 3)).padStart(2, '0')}T09:00:00.000Z`,
      endTime: `2026-05-${String(10 + Math.floor(index / 3)).padStart(2, '0')}T10:00:00.000Z`,
    }));
  }

  async getNeighbourhoodPulse(placeId: string): Promise<PulseZone[]> {
    return buildPulseZones(placeId);
  }

  async computeCarbonRoute(origin: string, destination: string): Promise<CarbonComparison> {
    return {
      origin,
      destination,
      routes: [
        {
          mode: 'transit',
          distanceKm: 18.4,
          durationMinutes: 42,
          carbonKg: 1.6,
          costUsd: 4,
          recommendation: 'Best balance across time, cost, and emissions.',
        },
        {
          mode: 'driving',
          distanceKm: 16.9,
          durationMinutes: 31,
          carbonKg: 4.2,
          costUsd: 11,
          recommendation: 'Fastest, but significantly higher emissions.',
        },
        {
          mode: 'bicycling',
          distanceKm: 14.3,
          durationMinutes: 55,
          carbonKg: 0,
          costUsd: 0,
          recommendation: 'Lowest carbon for local exploration.',
        },
      ],
    };
  }

  scoreMoodFit(activity: ItineraryActivity, mood?: MoodVector): number {
    if (!mood) {
      return 0.82;
    }

    const calmBoost = activity.moodTags.includes('calm') && mood.anxiety > 0.6 ? 0.18 : 0;
    const energyBoost = activity.moodTags.includes('energetic') && mood.energy > 0.6 ? 0.15 : 0;
    const restorativeBoost =
      activity.moodTags.includes('restorative') && mood.energy < 0.4 ? 0.2 : 0;

    return Math.min(0.99, 0.55 + calmBoost + energyBoost + restorativeBoost);
  }
}
