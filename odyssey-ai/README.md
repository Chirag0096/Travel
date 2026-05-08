# ODYSSEY AI

ODYSSEY AI is a competition-ready travel planning and live experience engine built as a Turborepo monorepo with:

- `apps/web` — Next.js 14 frontend
- `apps/api` — Fastify + tRPC backend
- `ml` — Python model training and inference scaffolds
- `infrastructure` — Docker and Cloud Build assets
- `tests` — unit, integration, and e2e coverage

## Quick Start

1. Install dependencies with `pnpm install`
2. Copy `.env.example` values into local secrets storage or environment files
3. Run the web app with `pnpm --filter @odyssey/web dev`
4. Run the API with `pnpm --filter @odyssey/api dev`

## Current Milestone

This repository implements a production-shaped vertical slice:

- AI trip planning
- Live trip canvas
- Travel DNA dashboard
- Pulse heatmap
- Visual destination matching
- Collaboration and conflict-resolution contracts
- ML inference adapters with deterministic fallback behavior

