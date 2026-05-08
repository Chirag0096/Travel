import joblib


def load_model(model_path: str = "disruption_shield_v1.joblib"):
    return joblib.load(model_path)

