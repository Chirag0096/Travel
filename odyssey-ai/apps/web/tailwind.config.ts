import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0b1021',
        mist: '#94a3b8',
        glow: '#8b5cf6',
        aqua: '#38bdf8',
        mint: '#22c55e',
      },
    },
  },
  plugins: [],
};

export default config;

