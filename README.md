# ODYSSEY AI 🌍

> Your journey, alive. — The world's first mood-aware, disruption-predictive,
> carbon-intelligent travel planning engine.

Built for the Google Travel Planning & Experience Engine Challenge.

---

## What is ODYSSEY AI?

ODYSSEY AI is an adaptive travel platform that plans trips like a living system instead of a static checklist. Traditional travel apps generate plans once, then leave travelers to manually recover when delays, crowd spikes, weather shifts, or group preference conflicts happen. ODYSSEY AI is designed to react continuously as trip context changes.

The product combines user preference memory, mood signals, mobility constraints, and real-time destination context to produce itineraries that are both ambitious and resilient. At planning time, ODYSSEY AI optimizes activities across time, cost, and carbon; during execution, it monitors disruption risk and proposes pre-emptive alternatives.

Most current apps optimize for search and booking, not dynamic decision support. They excel at inventory but fail at daily trip orchestration. ODYSSEY AI closes that gap by turning fragmented maps, AI, and model outputs into a coherent travel operating layer.

The differentiator is the integrated architecture: Travel DNA profiling, predictive disruption scoring, local pulse modeling, multi-objective itinerary optimization, and collaborative conflict resolution in one product loop.

---

## Features

### 🧬 Travel DNA Profiler

Travel DNA tracks how each traveler actually behaves across trips and updates an 8-axis preference vector. This gives users explainable archetypes and better personalization than one-time onboarding forms.

### 🛡️ Predictive Disruption Shield

Disruption Shield predicts likely delays and context failures before they happen, then surfaces alternatives early. It shifts the product from reactive alerts to proactive itinerary resilience.

### 🎭 Mood-Adaptive Itinerary Engine

Morning mood vectors adjust daily sequencing to reduce stress and improve flow. Low-energy or high-anxiety states bias toward calmer activities and shorter transitions.

### 📡 Local Pulse Heatmap

Pulse scoring fuses neighborhood liveliness, crowd dynamics, and timing windows to show the best hour to visit. Travelers can plan around moment-by-moment destination quality instead of static rankings.

### 🌱 Carbon-Intelligent Routing

Route comparisons make carbon a first-class signal beside time and cost. Users can switch between eco, balanced, and fast modes while seeing explicit trade-offs.

### 👥 Collaborative Trip Brain

Collaborative planning supports multi-user edits and preference-aware compromise suggestions. It reduces planning friction in group trips by surfacing practical middle-ground options.

### 📈 Price Intelligence Engine

Forecast models estimate route-level price movement and booking windows over the next 60 days. Travelers get confidence intervals and actionable timing recommendations.

### 📸 Visual Destination Match

Image-based destination matching maps visual intent to real places and then seeds a full planning flow. This turns inspiration content into executable travel plans quickly.

---

## Tech Stack

| Layer      | Technology                                            |
| ---------- | ----------------------------------------------------- |
| Frontend   | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui       |
| State      | Zustand, React Query                                  |
| Maps       | Google Maps Platform (Places, Directions, Routes API) |
| Backend    | Fastify, tRPC, Node.js 20                             |
| AI / LLM   | Google Gemini 1.5 Pro, LangChain.js                   |
| ML Models  | XGBoost, LSTM, RL (PPO), GNN, Sentence-Transformers   |
| ML Serving | Google Vertex AI                                      |
| Database   | PostgreSQL 16 (Supabase), Firebase Realtime DB        |
| Cache      | Redis (Upstash)                                       |
| Queue      | Google Pub/Sub                                        |
| Auth       | Firebase Authentication                               |
| Storage    | Google Cloud Storage                                  |
| Deployment | Google Cloud Run, Cloud Build                         |

---

## Architecture

```text
[ Next.js Web App ]
        |
        v
[ Fastify API + Services ]
        |
        +--> [ Google Maps / Firebase / Vision / Translation ]
        |
        +--> [ Vertex AI Endpoints ]
        |
        v
[ PostgreSQL + Redis + Firestore ]
        |
        v
[ Response + Realtime Updates to Web ]
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- Docker + Docker Compose
- Google Cloud SDK (`gcloud`)
- A Google Cloud project with these APIs enabled:
  - Maps JavaScript API
  - Places API (New)
  - Directions API
  - Routes API
  - Distance Matrix API
  - Vertex AI API
  - Vision AI API
  - Cloud Translation API
  - Pub/Sub API
  - Cloud Run API
  - Secret Manager API

### 1. Clone the repository

`git clone https://github.com/your-org/odyssey-ai.git`
`cd odyssey-ai`

### 2. Install dependencies

`npm install`

### 3. Set up environment variables

`cp .env.example .env.local`

### 4. Set up the database

`cd apps/api`
`npx drizzle-kit migrate`

### 5. Run in development

`npm run dev`

### 6. Run the ML pipeline (optional for local dev — Vertex AI endpoints available by default)

`cd ml`
`pip install -r requirements.txt`
`python models/disruption_shield/train.py`
`python serving/vertex_deploy.py`

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in each value.
Never commit `.env.local`. All production secrets are managed via Google Cloud Secret Manager.

| Variable             | Description                  | Where to get it      |
| -------------------- | ---------------------------- | -------------------- |
| GEMINI_API_KEY       | Google Gemini API key        | Google AI Studio     |
| GOOGLE_MAPS_API_KEY  | Maps Platform key            | Google Cloud Console |
| VERTEX_AI_PROJECT_ID | GCP project ID               | Google Cloud Console |
| FIREBASE_PROJECT_ID  | Firebase project             | Firebase Console     |
| DATABASE_URL         | PostgreSQL connection string | Supabase dashboard   |
| REDIS_URL            | Redis connection             | Upstash dashboard    |
| ALGOLIA_APP_ID       | Search app ID                | Algolia dashboard    |

---

## Google Services Used

| Service               | How It Is Used                                          |
| --------------------- | ------------------------------------------------------- |
| Maps JavaScript API   | Interactive trip map, route display, heatmap layer      |
| Places API (New)      | Activity search, autocomplete, place details            |
| Directions API        | Route calculation, travel time estimation               |
| Routes API            | Multi-modal route comparison (drive/transit/walk)       |
| Distance Matrix API   | Travel time matrix for RL optimizer                     |
| Vertex AI             | Hosts model endpoints (disruption, price, DNA, GNN, RL) |
| Vision AI             | Visual destination matching from user-uploaded photos   |
| Cloud Translation API | Multilingual support for trip content                   |
| Firebase Auth         | User authentication and session management              |
| Firebase Realtime DB  | Live collaborative editing and cursor presence          |
| Firestore             | Trip metadata and profile sync                          |
| Cloud Messaging       | Push notifications for disruption alerts                |
| Google Pub/Sub        | Async queue for AI/ML jobs                              |
| Cloud Storage         | User uploads and export artifacts                       |
| BigQuery              | Analytics and model training warehouse                  |
| Cloud Run             | Auto-scaling container hosting                          |
| Cloud Build           | CI/CD image builds and deployments                      |
| Secret Manager        | Secure storage of production secrets                    |

---

## API Reference

Full API documentation is available in `docs/api-reference.md`.

| Method | Endpoint                    | Description                 |
| ------ | --------------------------- | --------------------------- |
| POST   | /api/trips/plan             | AI trip generation          |
| GET    | /api/trips/:id              | Get trip with live status   |
| PATCH  | /api/trips/:id/mood         | Update mood and reorder     |
| GET    | /api/trips/:id/alternatives | Get disruption alternatives |
| GET    | /api/pulse/:placeId         | Neighbourhood pulse score   |
| GET    | /api/pulse/heatmap          | City-wide pulse GeoJSON     |
| POST   | /api/destinations/match     | Visual destination match    |
| GET    | /api/forecasts/prices       | 60-day price forecast       |
| GET    | /api/profile/dna            | User Travel DNA             |
| POST   | /api/profile/feedback       | Post-trip DNA update        |

---

## ML Models

| Model               | Algorithm                 | Purpose                             | Latency |
| ------------------- | ------------------------- | ----------------------------------- | ------- |
| Disruption Shield   | XGBoost                   | Predicts delays 12–72h ahead        | <50ms   |
| Price Forecaster    | Bi-LSTM + Prophet         | 60-day price forecast with CI       | <200ms  |
| Itinerary Optimizer | PPO (RL)                  | Multi-objective activity sequencing | <500ms  |
| Travel DNA          | DBSCAN + EMA              | Psychographic traveler profiling    | <30ms   |
| Recommender         | GNN (PyTorch Geometric)   | Personalized activity ranking       | <100ms  |
| Destination Match   | CLIP ViT-L/14 + Vision AI | Photo-to-destination similarity     | <800ms  |

See `docs/ml-models.md` for training details, dataset sources, and benchmarks.

---

## Testing

`npm run test`
`npm run test:unit`
`npm run test:integration`
`npm run test:e2e`
`npm run test:coverage`

---

## Deployment

### Deploy to Google Cloud Run

`gcloud auth login`
`gcloud config set project YOUR_PROJECT_ID`
`gcloud builds submit --config infrastructure/cloudbuild.yaml`

### Deploy ML models to Vertex AI

`cd ml`
`python serving/vertex_deploy.py --project YOUR_PROJECT_ID`

---

## Project Structure

```text
odyssey-ai/
├── apps/
│   ├── web/
│   └── api/
├── ml/
├── infrastructure/
├── tests/
├── docs/
└── .github/
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit with conventional commits: `git commit -m "feat: add mood reordering"`
4. Push and open a Pull Request

Pre-commit hooks run lint, type-check, and unit tests.

---

## License

MIT License — see LICENSE file for details.

---

## Acknowledgements

Built with Google Cloud, Gemini AI, Firebase, and Google Maps Platform for the
Google Travel Planning & Experience Engine Challenge.
