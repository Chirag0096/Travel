'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';

export function useDisruptionShield(tripId: string) {
  return useQuery({
    queryKey: ['trip-alternatives', tripId],
    queryFn: async () => apiClient.getTripAlternatives(tripId),
  });
}
