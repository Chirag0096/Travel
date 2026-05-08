# ML Models

## 1) Disruption Shield

- Purpose: predict delays and route disruption risk before itinerary execution.
- Algorithm: XGBoost classifier with temporal feature engineering.
- Data: historical route delay + weather + route context.
- Inputs: time features, route stats, weather severity, traffic indicators.
- Outputs: probability, risk level, delay estimate.
- Metrics: target AUC >= 0.80 on temporal splits.
- Serving: Vertex endpoint pattern `projects/{project}/locations/{region}/endpoints/{id}`.
- Retrain: `python ml/models/disruption_shield/train.py`.

## 2) Price Forecaster

- Purpose: estimate price trends and booking windows for routes.
- Algorithm: Bi-LSTM plus Prophet summary blending.
- Data: route-level daily price history.
- Inputs: sequence window (90 days) with route signals.
- Outputs: forecast curve, confidence bounds, best booking day.
- Metrics: RMSE, MAPE, trend accuracy.
- Serving: Vertex endpoint per route cluster.
- Retrain: `python ml/models/price_forecast/lstm_model.py` + ensemble step.

## 3) Itinerary Optimizer

- Purpose: sequence activities under time, carbon, and preference constraints.
- Algorithm: PPO reinforcement learning on custom itinerary environment.
- Data: activities, travel-time matrix, user preference vectors.
- Inputs: candidate activities + mood + preferences.
- Outputs: ranked schedule and reward score.
- Metrics: average reward, schedule feasibility rate.
- Serving: Vertex endpoint for inference-only scheduling.
- Retrain: `python ml/models/rl_optimizer/agent.py`.

## 4) Travel DNA Profiler

- Purpose: maintain evolving psychographic travel profile.
- Algorithm: clustering + exponential moving average updates.
- Data: post-trip feedback and interaction summaries.
- Inputs: DNA vector + trip feedback signals.
- Outputs: updated DNA vector and archetype label.
- Metrics: profile stability and archetype consistency.
- Serving: low-latency endpoint from backend service.
- Retrain: `python ml/models/travel_dna/profiler.py`.

## 5) GNN Recommender

- Purpose: rank destination/activity options in graph context.
- Algorithm: graph embedding and score model (PyTorch Geometric baseline).
- Data: destination graph nodes + behavioral edges.
- Inputs: graph features and user preference embedding.
- Outputs: relevance scores.
- Metrics: top-k precision and NDCG.
- Serving: Vertex endpoint for top-k ranking.
- Retrain: `python ml/models/gnn_recommender/inference.py`.

## 6) Visual Destination Match

- Purpose: map user-uploaded visual references to candidate destinations.
- Algorithm: CLIP embedding similarity + Vision metadata fusion.
- Data: destination media embeddings and labels.
- Inputs: image embedding + contextual tags.
- Outputs: ranked destination matches with confidence.
- Metrics: top-1/top-3 match accuracy.
- Serving: Vision + Vertex hybrid path.
- Retrain: refresh embedding index and model thresholds.
