#!/bin/bash

echo "🚀 Building frontend..."
cd frontend
npm run build
cd ..

echo "☁️ Deploying to Google Cloud Run..."
gcloud run deploy aura-travel-engine \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8000 \
  --max-instances 2

echo "✅ Deployment complete! Look for the Service URL above."
