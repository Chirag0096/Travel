import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  vector,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  firebaseUid: text('firebase_uid').notNull().unique(),
  email: text('email').notNull().unique(),
  displayName: text('display_name'),
  avatarUrl: text('avatar_url'),
  travelDna: jsonb('travel_dna').default({}),
  archetype: text('archetype'),
  carbonPreference: text('carbon_preference').default('balanced'),
  language: text('language').default('en'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const trips = pgTable(
  'trips',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    ownerId: uuid('owner_id').references(() => users.id),
    title: text('title').notNull(),
    description: text('description'),
    destinationIds: uuid('destination_ids').array(),
    startDate: date('start_date').notNull(),
    endDate: date('end_date').notNull(),
    status: text('status').default('planning'),
    moodSnapshot: jsonb('mood_snapshot'),
    carbonScore: numeric('carbon_score', { precision: 8, scale: 2 }),
    budgetUsd: numeric('budget_usd', { precision: 10, scale: 2 }),
    isCollaborative: boolean('is_collaborative').default(false),
    shareToken: text('share_token').unique(),
    itinerary: jsonb('itinerary').notNull().default([]),
    disruptionAlerts: jsonb('disruption_alerts').default([]),
    metadata: jsonb('metadata').default({}),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    ownerIndex: index('idx_trips_owner').on(table.ownerId),
    datesIndex: index('idx_trips_dates').on(table.startDate, table.endDate),
  }),
);

export const tripCollaborators = pgTable(
  'trip_collaborators',
  {
    tripId: uuid('trip_id').references(() => trips.id),
    userId: uuid('user_id').references(() => users.id),
    role: text('role').default('editor'),
    joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.tripId, table.userId] }),
  }),
);

export const destinations = pgTable(
  'destinations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    googlePlaceId: text('google_place_id').notNull().unique(),
    name: text('name').notNull(),
    country: text('country').notNull(),
    city: text('city'),
    lat: numeric('lat', { precision: 9, scale: 6 }).notNull(),
    lng: numeric('lng', { precision: 9, scale: 6 }).notNull(),
    category: text('category').array(),
    tags: text('tags').array(),
    climateMonths: jsonb('climate_months'),
    avgCarbonFlightKg: numeric('avg_carbon_flight_kg', {
      precision: 8,
      scale: 2,
    }),
    embedding: vector('embedding', { dimensions: 384 }),
    pulseScore: integer('pulse_score').default(50),
    lastPulseUpdate: timestamp('last_pulse_update', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    embeddingIndex: index('idx_destinations_embedding').using(
      'ivfflat',
      table.embedding.op('vector_cosine_ops'),
    ),
  }),
);

export const activities = pgTable(
  'activities',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    destinationId: uuid('destination_id').references(() => destinations.id),
    googlePlaceId: text('google_place_id'),
    name: text('name').notNull(),
    category: text('category').notNull(),
    durationMinutes: integer('duration_minutes'),
    costUsd: numeric('cost_usd', { precision: 6, scale: 2 }),
    energyLevel: text('energy_level'),
    moodTags: text('mood_tags').array(),
    carbonKg: numeric('carbon_kg', { precision: 6, scale: 2 }).default('0'),
    lat: numeric('lat', { precision: 9, scale: 6 }),
    lng: numeric('lng', { precision: 9, scale: 6 }),
    openingHours: jsonb('opening_hours'),
    googleRating: numeric('google_rating', { precision: 2, scale: 1 }),
    reviewCount: integer('review_count'),
    photoReferences: text('photo_references').array(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    destinationIndex: index('idx_activities_destination').on(table.destinationId),
  }),
);

export const priceForecasts = pgTable(
  'price_forecasts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    origin: text('origin').notNull(),
    destination: text('destination').notNull(),
    travelDate: date('travel_date').notNull(),
    predictedPriceUsd: numeric('predicted_price_usd', { precision: 8, scale: 2 }),
    confidenceIntervalLow: numeric('confidence_interval_low', {
      precision: 8,
      scale: 2,
    }),
    confidenceIntervalHigh: numeric('confidence_interval_high', {
      precision: 8,
      scale: 2,
    }),
    optimalBookingDaysAhead: integer('optimal_booking_days_ahead'),
    modelVersion: text('model_version'),
    generatedAt: timestamp('generated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    routeIndex: index('idx_price_forecasts_route').on(table.origin, table.destination),
  }),
);

export const disruptionPredictions = pgTable('disruption_predictions', {
  id: uuid('id').defaultRandom().primaryKey(),
  tripId: uuid('trip_id').references(() => trips.id),
  type: text('type').notNull(),
  probability: numeric('probability', { precision: 3, scale: 2 }),
  predictedImpactMinutes: integer('predicted_impact_minutes'),
  affectedSegment: jsonb('affected_segment'),
  alternativeItinerary: jsonb('alternative_itinerary'),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  generatedAt: timestamp('generated_at', { withTimezone: true }).defaultNow(),
});

export const moodLogs = pgTable('mood_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  tripId: uuid('trip_id').references(() => trips.id),
  moodVector: jsonb('mood_vector').notNull(),
  source: text('source'),
  loggedAt: timestamp('logged_at', { withTimezone: true }).defaultNow(),
});
