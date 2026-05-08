from stable_baselines3 import PPO


def build_agent(env):
    return PPO("MlpPolicy", env, verbose=0)

