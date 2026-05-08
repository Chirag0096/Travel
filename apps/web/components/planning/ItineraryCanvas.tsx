'use client';

import type { TripResponse } from '../../stores/tripStore';
import { DayCard } from './DayCard';

export function ItineraryCanvas({ trip }: { trip: TripResponse }) {
  return (
    <div className="glass p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Live trip canvas</p>
          <h1 className="mt-2 text-3xl font-semibold">{trip.title}</h1>
        </div>
        <div className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-100">
          Disruption shield active
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {trip.itinerary.map((day) => (
          <DayCard key={day.dayIndex} day={day} />
        ))}
      </div>
    </div>
  );
}
