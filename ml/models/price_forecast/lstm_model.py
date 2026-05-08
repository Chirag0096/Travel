import numpy as np
from tensorflow import keras


class PriceLSTM:
    def __init__(self, sequence_length: int = 90, forecast_horizon: int = 60):
        self.sequence_length = sequence_length
        self.forecast_horizon = forecast_horizon
        self.model = self._build_model()

    def _build_model(self):
        inputs = keras.Input(shape=(self.sequence_length, 8))
        x = keras.layers.Bidirectional(
            keras.layers.LSTM(64, return_sequences=True, dropout=0.2)
        )(inputs)
        x = keras.layers.Bidirectional(
            keras.layers.LSTM(32, return_sequences=False, dropout=0.2)
        )(x)
        x = keras.layers.Dense(128, activation="relu")(x)
        mean = keras.layers.Dense(self.forecast_horizon, name="mean")(x)
        lower = keras.layers.Dense(self.forecast_horizon, name="lower")(x)
        upper = keras.layers.Dense(self.forecast_horizon, name="upper")(x)
        model = keras.Model(inputs, [mean, lower, upper])
        model.compile(optimizer="adam", loss="mse")
        return model

    def forecast(self, recent_prices: np.ndarray) -> dict:
        recent = recent_prices.reshape(1, self.sequence_length, 8)
        mean, lower, upper = self.model.predict(recent, verbose=0)
        return {
            "forecast": mean.flatten().tolist(),
            "lower_ci": lower.flatten().tolist(),
            "upper_ci": upper.flatten().tolist(),
            "optimal_booking_day": int(np.argmin(mean.flatten())),
            "price_trend": "rising",
        }

