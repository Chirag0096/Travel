# Deployment Guide

## 1. Google Cloud project setup

Create/select a GCP project and set billing. Configure `gcloud` default project.

## 2. Enable required APIs

Enable: Cloud Run, Cloud Build, Artifact Registry, Secret Manager, Vertex AI, Pub/Sub, Vision AI, Cloud Translation, Maps APIs, Firebase Management API.

## 3. Firebase setup

Create Firebase project linked to GCP project, enable Auth providers, Realtime DB, and Firestore.

## 4. Supabase setup

Create PostgreSQL instance, copy `DATABASE_URL`, run migrations from `apps/api`.

## 5. Upstash Redis setup

Create Redis database and capture `REDIS_URL`.

## 6. Secret Manager setup

Add secrets for every non-public key in `.env.example`.
Use versioned secrets and IAM-restricted service accounts.

## 7. Vertex AI model deployment

Train/upload model artifacts, create endpoints, deploy model versions.
Record endpoint IDs and region.

## 8. Cloud Run deployment

Build and deploy API/Web using `gcloud builds submit --config infrastructure/cloudbuild.yaml`.

## 9. Firebase Hosting setup

Configure hosting target and rewrite rules for web entrypoint and static assets.

## 10. Domain and SSL setup

Map custom domain to Cloud Run/Firebase Hosting and validate managed SSL cert.

## 11. Monitoring and alerting setup

Enable Cloud Logging, Error Reporting, uptime checks, latency/error SLO alerts, and budget alerts.
