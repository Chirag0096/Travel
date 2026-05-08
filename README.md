# ODYSSEY AI 🌍

> Your journey, alive. — A mood-aware, disruption-predictive, carbon-intelligent travel planning engine.

ODYSSEY AI is a full-stack competition project for dynamic travel planning with real-time adaptation.

---

## Why ODYSSEY AI?

Most travel apps are optimized for search and booking, not for real-time trip orchestration once travel actually begins. ODYSSEY AI focuses on the hardest part: adapting plans when mood, weather, crowds, transport risk, and group preferences shift.

It combines AI planning, route intelligence, collaborative editing, and personalized behavioral learning in one loop. Instead of static itineraries, users get resilient day plans with alternatives ready before disruptions happen.

---

## Core Features

- **Travel DNA Profiler**: Learns traveler preferences over time across 8 behavior axes.
- **Predictive Disruption Shield**: Detects risk windows and provides proactive alternatives.
- **Mood-Adaptive Planning**: Reorders itinerary blocks based on daily mood check-ins.
- **Local Pulse Heatmap**: Shows neighborhood pulse and best timing per area.
- **Carbon-Intelligent Routing**: Surfaces time/cost/carbon tradeoffs across route modes.
- **Collaborative Trip Brain**: Multi-user trip planning with AI compromise suggestions.
- **Price Intelligence**: Forecast-guided booking windows with confidence bands.
- **Visual Destination Match**: Convert travel inspiration images into destination plans.

---

## Architecture at a Glance

```text
[ Next.js Web App ]
        |
        v
[ Fastify API Layer ]
        |
        +--> [ Google Services: Maps, Firebase, Vision, Translation ]
        |
        +--> [ AI/ML Services: Gemini + Vertex Adapters ]
        |
        v
[ PostgreSQL + Redis + Firestore/RTDB ]
        |
        v
[ Live Itinerary Updates + Alerts + Collaboration Events ]
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| UI | shadcn/ui, custom map/planning/chart components |
| State/Data | Zustand, React Query |
| Backend | Fastify, Zod, Node.js 20 |
| AI/LLM | Gemini integration service |
| ML | Python modules for disruption, forecast, RL, DNA, GNN |
| Database | PostgreSQL (Drizzle schema), Firebase RTDB/Firestore adapters |
| Cache/Queue | Redis (Upstash), Pub/Sub-ready architecture |
| Cloud | Google Cloud Run, Cloud Build, Secret Manager-ready |

---

## Monorepo Structure

```text
PromptWar/
├── apps/
│   ├── web/                  # Next.js frontend
│   └── api/                  # Fastify backend
├── packages/
│   └── shared/               # Shared Zod schemas + types
├── ml/                       # Python ML model modules + serving adapters
├── infrastructure/
│   ├── docker/               # Dockerfiles
│   ├── terraform/            # Infra templates
│   └── cloudbuild.yaml       # CI/CD pipeline
├── docs/                     # Architecture/API/ML/Deployment docs
└── tests/                    # Unit/integration/e2e test suites
```

---

## Local Development

### Prerequisites

- Node.js 20+
- pnpm 9+
- Python 3.11+ (for `ml/` workflows)
- Google Cloud SDK (for deployment commands)

### Setup

```bash
git clone git@github.com:Chirag0096/Travel.git
cd PromptWar
pnpm install
cp .env.example .env.local
```

### Run

```bash
# Terminal 1
pnpm --dir apps/api dev

# Terminal 2
pnpm --dir apps/web dev
```

- Web: `http://localhost:3000`
- API Health: `http://localhost:3001/health`

### Quality Checks

```bash
pnpm --dir apps/api lint
pnpm --dir apps/web lint
pnpm --dir apps/api test:unit
pnpm --dir apps/api test:integration
pnpm --dir apps/web build
pnpm --dir apps/api build
```

---

## Production URLs

- Frontend: `https://odyssey-web-415567294720.us-central1.run.app`
- API: `https://odyssey-api-415567294720.us-central1.run.app`
- API Health: `https://odyssey-api-415567294720.us-central1.run.app/health`

---

## API Surface (Primary)

- `POST /api/trips/plan`
- `GET /api/trips/:id`
- `PATCH /api/trips/:id/mood`
- `GET /api/trips/:id/alternatives`
- `POST /api/trips/:id/collab/join`
- `GET /api/pulse/:placeId`
- `GET /api/pulse/heatmap`
- `POST /api/destinations/match`
- `GET /api/forecasts/prices`
- `GET /api/profile/dna`
- `POST /api/profile/feedback`
- `GET /api/carbon/compare`
- `POST /api/ai/conflict-resolve`

For full request/response schemas, see `docs/api-reference.md`.

---

## Deployment Notes

- API and Web run as separate Cloud Run services.
- The web app uses an API rewrite strategy (`/api/*`) to route to backend origin.
- Secret Manager wiring is supported, with local-safe defaults for development.

---

## License

MIT (project challenge submission format).
