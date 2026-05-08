# API Reference

Base URL: `http://localhost:3001`
Auth: Firebase JWT on protected endpoints.

All success responses use:

```json
{ "data": {} }
```

## POST /api/trips/plan

- Auth: Required
- Body:
  - `destination: string (2..200)`
  - `startDate: string (ISO datetime)`
  - `endDate: string (ISO datetime)`
  - `travelerCount: integer (1..20)`
  - `budget?: number >= 0`
  - `mood?: { energy: 0..1, anxiety: 0..1, excitement: 0..1 }`
  - `preferences: { adventure, culture, comfort, sustainability, food, pace }`
  - `constraints: { avoidCrowds, mobilityRestrictions, dietaryRestrictions[], maxWalkingKm }`
  - `collaborators: uuid[]`
  - `carbonMode: eco|balanced|fast`
- cURL:

```bash
curl -X POST http://localhost:3001/api/trips/plan \
  -H 'Content-Type: application/json' \
  -d '{"destination":"Bangkok","startDate":"2026-07-12T00:00:00.000Z","endDate":"2026-07-15T00:00:00.000Z","travelerCount":2,"preferences":{"adventure":0.6,"culture":0.8,"comfort":0.6,"sustainability":0.7,"food":0.7,"pace":0.5},"constraints":{"avoidCrowds":true,"mobilityRestrictions":false,"dietaryRestrictions":[],"maxWalkingKm":8},"collaborators":[],"carbonMode":"balanced"}'
```

- Success:

```json
{ "data": { "trip": {}, "narrative": "...", "disruptions": [] } }
```

- Errors: `400`, `401`, `429`, `500`

## GET /api/trips/:id

- Auth: Required
- Success:

```json
{ "data": { "trip": {}, "liveDisruptionStatus": "low" } }
```

- Errors: `404`, `401`, `500`

## PATCH /api/trips/:id/mood

- Auth: Required
- Body: `mood` object with `energy`, `anxiety`, `excitement` in `[0,1]`
- Success:

```json
{ "data": { "trip": {}, "reordered": true } }
```

- Errors: `400`, `404`, `401`, `500`

## GET /api/trips/:id/alternatives

- Auth: Required
- Success:

```json
{ "data": { "alternatives": [] } }
```

- Errors: `404`, `401`, `500`

## POST /api/trips/:id/collab/join

- Auth: Required
- Success:

```json
{ "data": { "tripId": "...", "joined": true, "collaborationHint": "..." } }
```

## GET /api/pulse/:placeId

- Auth: Optional
- Success:

```json
{ "data": { "placeId": "...", "averagePulseScore": 71, "zones": [] } }
```

## GET /api/pulse/heatmap

- Query: `placeId?: string`
- Success:

```json
{ "data": { "type": "FeatureCollection", "features": [] } }
```

## POST /api/destinations/match

- Auth: Optional
- Success:

```json
{ "data": { "matches": [] } }
```

## GET /api/forecasts/prices

- Query: `origin`, `destination`, `travelDate`
- Success:

```json
{ "data": { "origin": "DEL", "destination": "BKK", "points": [] } }
```

## GET /api/profile/dna

- Auth: Required
- Success:

```json
{ "data": { "dna": {}, "archetype": "Slow Culture Seeker", "stats": {} } }
```

## POST /api/profile/feedback

- Auth: Required
- Body: `favoriteCategories[]`, `carbonSensitivity`, `paceSatisfaction`, `spontaneitySignal`
- Success:

```json
{ "data": { "dna": {}, "archetype": "..." } }
```

## GET /api/carbon/compare

- Query: `origin`, `destination`
- Success:

```json
{ "data": { "origin": "...", "destination": "...", "routes": [] } }
```

## POST /api/ai/conflict-resolve

- Body: `itineraryDays[]`
- Success:

```json
{ "data": { "summary": "...", "compromiseScore": 87, "itineraryDays": [] } }
```
