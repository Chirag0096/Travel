'use client';

import { useMutation } from '@tanstack/react-query';
import type { MoodVector } from '@odyssey/shared';
import { apiClient } from '../lib/api-client';

export function useMoodAdaptation(tripId: string) {
  return useMutation({
    mutationFn: async (mood: MoodVector) => apiClient.updateTripMood(tripId, mood),
  });
}
