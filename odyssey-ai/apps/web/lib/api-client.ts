import type { MoodVector, PlanTripInput, TravelDNA } from '@odyssey/shared';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.API_BASE_URL ??
  'http://localhost:4000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  planTrip: (payload: PlanTripInput) =>
    request<{
      trip: {
        id: string;
        ownerId: string;
        title: string;
        destination: string;
        startDate: string;
        endDate: string;
        itinerary: Array<{
          dayIndex: number;
          date: string;
          theme: string;
          activities: Array<{
            id: string;
            name: string;
            category: string;
            durationMinutes: number;
            costUsd: number;
            carbonKg: number;
            moodTags: string[];
            rating: number;
            lat: number;
            lng: number;
            note: string;
            startTime: string;
            endTime: string;
          }>;
        }>;
        disruptionAlerts: Array<{
          id: string;
          riskLevel: 'low' | 'medium' | 'high';
          summary: string;
          alternativeTitle: string;
          type: 'flight_delay' | 'weather' | 'strike' | 'crowding';
          probability: number;
          predictedImpactMinutes: number;
        }>;
        carbonScore: number;
      };
      narrative: string;
      disruptions: unknown[];
    }>('/api/trips/plan', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getTrip: (id: string) =>
    request<{
      trip: {
        id: string;
        ownerId: string;
        title: string;
        destination: string;
        startDate: string;
        endDate: string;
        itinerary: Array<{
          dayIndex: number;
          date: string;
          theme: string;
          activities: Array<{
            id: string;
            name: string;
            category: string;
            durationMinutes: number;
            costUsd: number;
            carbonKg: number;
            moodTags: string[];
            rating: number;
            lat: number;
            lng: number;
            note: string;
            startTime: string;
            endTime: string;
          }>;
        }>;
        disruptionAlerts: Array<{
          id: string;
          type: 'flight_delay' | 'weather' | 'strike' | 'crowding';
          probability: number;
          riskLevel: 'low' | 'medium' | 'high';
          predictedImpactMinutes: number;
          summary: string;
          alternativeTitle: string;
        }>;
        carbonScore: number;
      };
      liveDisruptionStatus: string;
    }>(`/api/trips/${id}`),
  updateTripMood: (tripId: string, mood: MoodVector) =>
    request(`/api/trips/${tripId}/mood`, {
      method: 'PATCH',
      body: JSON.stringify({ mood }),
    }),
  getTripAlternatives: (tripId: string) =>
    request(`/api/trips/${tripId}/alternatives`),
  getPulse: (placeId: string) => request(`/api/pulse/${placeId}`),
  getPulseHeatmap: (placeId: string) =>
    request<Record<string, unknown>>(`/api/pulse/heatmap?placeId=${placeId}`),
  matchDestination: () =>
    request<{
      matches: Array<{
        id: string;
        name: string;
        confidence: number;
        summary: string;
        photoUrl: string;
      }>;
    }>('/api/destinations/match', {
      method: 'POST',
      body: JSON.stringify({}),
    }),
  getProfile: () =>
    request<{
      dna: TravelDNA;
      archetype: string;
      stats: {
        totalCarbonFootprintKg: number;
        countriesVisited: number;
        categoryBreakdown: Record<string, number>;
      };
    }>('/api/profile/dna'),
};
