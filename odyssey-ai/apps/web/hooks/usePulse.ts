'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';

export function usePulse(placeId: string) {
  return useQuery({
    queryKey: ['pulse', placeId],
    queryFn: async () => apiClient.getPulse(placeId),
  });
}

