'use client';

import type { TripResponse } from '../../stores/tripStore';

export function TripMap({ trip }: { trip: TripResponse }) {
  return (
    <div className="glass p-6">
      <h2 className="text-xl font-semibold">Live map</h2>
      <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300">
        Google Maps integration mounts here with route polyline, pulse layers,
        and disruption overlays.
      </div>
      <div className="mt-4 space-y-3">
        {trip.itinerary.flatMap((day) => day.activities).slice(0, 4).map((activity) => (
          <div key={activity.id} className="rounded-2xl border border-white/10 p-3">
            <div className="flex items-center justify-between">
              <span>{activity.name}</span>
              <span className="text-sky-300">{activity.rating.toFixed(1)}★</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

