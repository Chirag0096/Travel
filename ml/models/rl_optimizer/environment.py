import gymnasium as gym
import numpy as np


class ItineraryEnv(gym.Env):
    metadata = {"render_modes": ["human"]}

    def __init__(self, activities: list, preferences: dict, mood: dict, num_days: int):
        super().__init__()
        self.activities = activities
        self.preferences = preferences
        self.mood = mood
        self.num_days = num_days
        self.action_space = gym.spaces.Discrete(len(activities))
        self.observation_space = gym.spaces.Box(
            low=-1.0,
            high=1.0,
            shape=(len(activities) + 10,),
            dtype=np.float32,
        )
        self.visited = set()

    def reset(self, seed=None, options=None):
        super().reset(seed=seed)
        self.visited = set()
        return np.zeros(self.observation_space.shape, dtype=np.float32), {}

    def step(self, action: int):
        reward = 1.0 if action not in self.visited else -1.0
        self.visited.add(action)
        done = len(self.visited) >= min(len(self.activities), self.num_days * 4)
        return (
            np.zeros(self.observation_space.shape, dtype=np.float32),
            reward,
            done,
            False,
            {},
        )

