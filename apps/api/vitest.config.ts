import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: [
      '../../tests/unit/services/**/*.test.ts',
      '../../tests/integration/routes/**/*.test.ts',
    ],
  },
});
