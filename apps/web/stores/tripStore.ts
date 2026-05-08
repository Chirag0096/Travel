import { create } from 'zustand';
import type { DisruptionPrediction, ItineraryDay, MoodVector } from '@odyssey/shared';

export type TripResponse = {
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

type TripStore = {
  latestTrip: TripResponse | null;
  setLatestTrip: (trip: TripResponse) => void;
};

export const useTripStore = create<TripStore>((set) => ({
  latestTrip: null,
  setLatestTrip: (trip) => set({ latestTrip: trip }),
}));
