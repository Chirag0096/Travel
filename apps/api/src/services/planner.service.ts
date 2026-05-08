import type { ItineraryActivity, ItineraryDay, PlanTripInput, TravelDNA } from '@odyssey/shared';
import { memoryStore, type TripRecord } from '../utils/mock-data.js';
import { CarbonService } from './carbon.service.js';
import { DisruptionService } from './disruption.service.js';
import { GeminiService } from './gemini.service.js';
import { MapsService } from './maps.service.js';
import { TravelDnaService } from './travel-dna.service.js';

type PlanResult = {
  trip: TripRecord;
  narrative: string;
};

export class PlannerService {
  private readonly mapsService = new MapsService();
  private readonly carbonService = new CarbonService();
  private readonly disruptionService = new DisruptionService();
  private readonly geminiService = new GeminiService();
  private readonly travelDnaService = new TravelDnaService();

  async planTrip(input: PlanTripInput, userId: string): Promise<PlanResult> {
    const normalizedInput: PlanTripInput = {
      ...input,
      carbonMode: input.carbonMode ?? 'balanced',
      constraints: {
        avoidCrowds: input.constraints?.avoidCrowds ?? false,
        mobilityRestrictions: input.constraints?.mobilityRestrictions ?? false,
        dietaryRestrictions: input.constraints?.dietaryRestrictions ?? [],
        maxWalkingKm: input.constraints?.maxWalkingKm ?? 10,
      },
      preferences: {
        ...input.preferences,
        pace: input.preferences.pace ?? 0.5,
        food: input.preferences.food ?? 0.5,
      },
      collaborators: input.collaborators ?? [],
    };

    const user = memoryStore.users.get(userId);
    const travelDNA = user?.travelDNA ?? this.travelDnaService.getDefaultProfile().dna;

    const destinationData = await this.mapsService.getDestinationContext(
      normalizedInput.destination,
    );
    const activities = await this.mapsService.getNearbyActivities(
      destinationData.lat,
      destinationData.lng,
      {
        preferences: normalizedInput.preferences,
        constraints: {
          avoidCrowds: normalizedInput.constraints?.avoidCrowds ?? false,
          mobilityRestrictions: normalizedInput.constraints?.mobilityRestrictions ?? false,
          dietaryRestrictions: normalizedInput.constraints?.dietaryRestrictions ?? [],
          maxWalkingKm: normalizedInput.constraints?.maxWalkingKm ?? 10,
        },
      },
    );

    const itinerary = this.buildItinerary(activities, normalizedInput, travelDNA);
    const disruptions = await this.disruptionService.predictForDates(
      normalizedInput.destination,
      normalizedInput.startDate,
      normalizedInput.endDate,
    );
    const narrative = await this.geminiService.buildNarrative(
      itinerary,
      normalizedInput,
      travelDNA,
    );
    const carbonScore = await this.carbonService.calculateTripCarbon(
      itinerary,
      normalizedInput.carbonMode ?? 'balanced',
    );

    const trip: TripRecord = {
      id: crypto.randomUUID(),
      ownerId: userId,
      title: `${normalizedInput.destination} — ${formatRange(
        normalizedInput.startDate,
        normalizedInput.endDate,
      )}`,
      destination: normalizedInput.destination,
      startDate: normalizedInput.startDate,
      endDate: normalizedInput.endDate,
      itinerary,
      disruptionAlerts: disruptions,
      carbonScore,
      budgetUsd: normalizedInput.budget,
      moodSnapshot: normalizedInput.mood,
    };

    memoryStore.trips.set(trip.id, trip);

    return {
      trip,
      narrative,
    };
  }

  getTrip(id: string): TripRecord | undefined {
    return memoryStore.trips.get(id);
  }

  updateTripMood(id: string, mood: PlanTripInput['mood']): TripRecord | undefined {
    const trip = memoryStore.trips.get(id);
    if (!trip || !mood) {
      return trip;
    }

    const reordered = trip.itinerary.map((day) => ({
      ...day,
      mood,
      activities: [...day.activities].sort((left, right) => {
        const leftScore = this.mapsService.scoreMoodFit(left, mood);
        const rightScore = this.mapsService.scoreMoodFit(right, mood);
        return rightScore - leftScore;
      }),
    }));

    const nextTrip = {
      ...trip,
      itinerary: reordered,
      moodSnapshot: mood,
    };

    memoryStore.trips.set(id, nextTrip);
    return nextTrip;
  }

  private buildItinerary(
    activities: ItineraryActivity[],
    input: PlanTripInput,
    travelDNA: TravelDNA,
  ): ItineraryDay[] {
    const days = Math.max(
      1,
      Math.ceil(
        (new Date(input.endDate).getTime() - new Date(input.startDate).getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    );

    return Array.from({ length: days }, (_, dayIndex) => {
      const selected = activities.slice(dayIndex, dayIndex + 3).map((activity, activityIndex) => {
        const startHour = 9 + activityIndex * 3;
        const startTime = new Date(input.startDate);
        startTime.setUTCDate(startTime.getUTCDate() + dayIndex);
        startTime.setUTCHours(startHour, 0, 0, 0);

        const endTime = new Date(startTime);
        endTime.setUTCMinutes(endTime.getUTCMinutes() + activity.durationMinutes);

        return {
          ...activity,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          note: `${activity.note} Mood-fit ${Math.round(
            this.mapsService.scoreMoodFit(activity, input.mood) * 100,
          )}% · culture bias ${Math.round(travelDNA.culture * 100)}%.`,
        };
      });

      return {
        dayIndex,
        date: new Date(new Date(input.startDate).getTime() + dayIndex * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        theme: dayIndex % 2 === 0 ? 'Calm cultural discovery' : 'Local pulse and social energy',
        mood: input.mood,
        activities: selected,
      };
    });
  }
}

function formatRange(startDate: string, endDate: string): string {
  return `${startDate.slice(0, 10)} → ${endDate.slice(0, 10)}`;
}
