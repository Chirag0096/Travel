'use client';

import { useCallback } from 'react';

export function useRealtime(tripId: string, userId: string) {
  const publishPresence = useCallback(
    (activeDay: number, activeActivityId?: string) => {
      return {
        tripId,
        userId,
        activeDay,
        activeActivityId,
      };
    },
    [tripId, userId],
  );

  const updateItinerary = useCallback(
    async (dayIndex: number, activities: string[]) => ({
      tripId,
      userId,
      dayIndex,
      activities,
    }),
    [tripId, userId],
  );

  const onConflict = useCallback((handler: (conflict: { summary: string }) => void) => {
    handler({
      summary: 'Compromise suggestion available for Day 2 afternoon.',
    });
    return () => undefined;
  }, []);

  return { publishPresence, updateItinerary, onConflict };
}
