import { z } from 'zod';

export const travelDnaAxes = [
  'adventure',
  'culture',
  'comfort',
  'pace',
  'social',
  'sustainability',
  'budgetSensitivity',
  'spontaneity',
] as const;

export type TravelDnaAxis = (typeof travelDnaAxes)[number];

export const moodVectorSchema = z.object({
  energy: z.number().min(0).max(1),
  anxiety: z.number().min(0).max(1),
  excitement: z.number().min(0).max(1),
});

export type MoodVector = z.infer<typeof moodVectorSchema>;

export const travelDnaSchema = z.object({
  adventure: z.number().min(0).max(1),
  culture: z.number().min(0).max(1),
  comfort: z.number().min(0).max(1),
  pace: z.number().min(0).max(1),
  social: z.number().min(0).max(1),
  sustainability: z.number().min(0).max(1),
  budgetSensitivity: z.number().min(0).max(1),
  spontaneity: z.number().min(0).max(1),
});

export type TravelDNA = z.infer<typeof travelDnaSchema>;

export const itineraryActivitySchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  durationMinutes: z.number().int().positive(),
  costUsd: z.number().nonnegative(),
  carbonKg: z.number().nonnegative(),
  moodTags: z.array(z.string()),
  rating: z.number().min(0).max(5),
  lat: z.number(),
  lng: z.number(),
  note: z.string(),
});

export type ItineraryActivity = z.infer<typeof itineraryActivitySchema>;

export const itineraryDaySchema = z.object({
  dayIndex: z.number().int().nonnegative(),
  date: z.string(),
  theme: z.string(),
  mood: moodVectorSchema.optional(),
  activities: z.array(itineraryActivitySchema),
});

export type ItineraryDay = z.infer<typeof itineraryDaySchema>;

export const disruptionPredictionSchema = z.object({
  id: z.string(),
  type: z.enum(['flight_delay', 'weather', 'strike', 'crowding']),
  probability: z.number().min(0).max(1),
  riskLevel: z.enum(['low', 'medium', 'high']),
  predictedImpactMinutes: z.number().int().nonnegative(),
  summary: z.string(),
  alternativeTitle: z.string(),
});

export type DisruptionPrediction = z.infer<typeof disruptionPredictionSchema>;

export const pulseZoneSchema = z.object({
  id: z.string(),
  placeId: z.string(),
  label: z.string(),
  hour: z.number().int().min(0).max(23),
  pulseScore: z.number().int().min(0).max(100),
  crowdLevel: z.enum(['low', 'medium', 'high']),
  hiddenGems: z.array(z.string()),
  centroid: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  polygon: z.array(
    z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  ),
});

export type PulseZone = z.infer<typeof pulseZoneSchema>;

export const priceForecastSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  travelDate: z.string(),
  predictedPriceUsd: z.number().nonnegative(),
  confidenceIntervalLow: z.number().nonnegative(),
  confidenceIntervalHigh: z.number().nonnegative(),
  optimalBookingDaysAhead: z.number().int().nonnegative(),
  trend: z.enum(['rising', 'stable', 'falling']),
  points: z.array(
    z.object({
      day: z.number().int().nonnegative(),
      price: z.number().nonnegative(),
    }),
  ),
});

export type PriceForecast = z.infer<typeof priceForecastSchema>;

export const carbonComparisonSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  routes: z.array(
    z.object({
      mode: z.enum(['walking', 'bicycling', 'transit', 'driving', 'flight']),
      distanceKm: z.number().nonnegative(),
      durationMinutes: z.number().int().nonnegative(),
      carbonKg: z.number().nonnegative(),
      costUsd: z.number().nonnegative(),
      recommendation: z.string(),
    }),
  ),
});

export type CarbonComparison = z.infer<typeof carbonComparisonSchema>;

export const conflictResolutionProposalSchema = z.object({
  summary: z.string(),
  compromiseScore: z.number().min(0).max(100),
  rationale: z.array(z.string()),
  itineraryDays: z.array(itineraryDaySchema),
});

export type ConflictResolutionProposal = z.infer<
  typeof conflictResolutionProposalSchema
>;

export const planTripSchema = z.object({
  destination: z.string().min(2).max(200),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  travelerCount: z.number().int().min(1).max(20),
  budget: z.number().min(0).optional(),
  mood: moodVectorSchema.optional(),
  preferences: z.object({
    adventure: z.number().min(0).max(1),
    culture: z.number().min(0).max(1),
    comfort: z.number().min(0).max(1),
    sustainability: z.number().min(0).max(1),
    food: z.number().min(0).max(1).default(0.5),
    pace: z.number().min(0).max(1).default(0.5),
  }),
  constraints: z.object({
    avoidCrowds: z.boolean().default(false),
    mobilityRestrictions: z.boolean().default(false),
    dietaryRestrictions: z.array(z.string()).default([]),
    maxWalkingKm: z.number().min(0).max(50).default(10),
  }),
  collaborators: z.array(z.string().uuid()).default([]),
  carbonMode: z.enum(['eco', 'balanced', 'fast']).default('balanced'),
});

export type PlanTripInput = z.input<typeof planTripSchema>;
export type PlanTrip = z.output<typeof planTripSchema>;

export const travelerArchetypes = [
  'Slow Culture Seeker',
  'Adrenaline Sprint Traveler',
  'Sustainable Wanderer',
  'Luxury Comfort Traveler',
  'Social Connector',
  'Foodie Explorer',
  'Spontaneous Adventurer',
  'Family Orchestrator',
] as const;

export type TravelerArchetype = (typeof travelerArchetypes)[number];

export const defaultTravelDNA: TravelDNA = {
  adventure: 0.55,
  culture: 0.72,
  comfort: 0.58,
  pace: 0.5,
  social: 0.45,
  sustainability: 0.66,
  budgetSensitivity: 0.47,
  spontaneity: 0.53,
};
