import joblib
import numpy as np
import pandas as pd
import xgboost as xgb
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import TimeSeriesSplit

FEATURES = [
    "hour_of_day",
    "day_of_week",
    "month",
    "days_until_travel",
    "historical_delay_rate_route_90d",
    "historical_delay_rate_airline_90d",
    "weather_severity_origin",
    "weather_severity_destination",
    "air_traffic_index",
    "strike_risk_score",
    "season_peak_index",
    "holiday_proximity_days",
]

TARGET = "delayed_15min_plus"


def train_disruption_model(data_path: str) -> xgb.XGBClassifier:
    df = pd.read_parquet(data_path)
    X = df[FEATURES]
    y = df[TARGET]
    splitter = TimeSeriesSplit(n_splits=3)
    best_model = None
    best_score = 0.0

    for train_idx, val_idx in splitter.split(X):
        X_train, X_val = X.iloc[train_idx], X.iloc[val_idx]
        y_train, y_val = y.iloc[train_idx], y.iloc[val_idx]
        model = xgb.XGBClassifier(
            n_estimators=300,
            max_depth=6,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            eval_metric="auc",
        )
        model.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)
        proba = model.predict_proba(X_val)[:, 1]
        auc = roc_auc_score(y_val, proba)
        if auc > best_score:
          best_model = model
          best_score = auc

    if best_model is None:
        raise RuntimeError("Failed to train disruption model")

    joblib.dump(best_model, "disruption_shield_v1.joblib")
    return best_model


def predict_disruption(model: xgb.XGBClassifier, feature_rows: list[dict]) -> list[dict]:
    frame = pd.DataFrame(feature_rows)[FEATURES]
    probabilities = model.predict_proba(frame)[:, 1]
    results = []
    for idx, probability in enumerate(probabilities):
        risk = "high" if probability > 0.6 else "medium" if probability > 0.35 else "low"
        results.append(
            {
                "segment_id": idx,
                "disruption_probability": round(float(probability), 3),
                "risk_level": risk,
                "predicted_delay_minutes": int(np.clip(probability * 180, 5, 180)),
            }
        )
    return results

