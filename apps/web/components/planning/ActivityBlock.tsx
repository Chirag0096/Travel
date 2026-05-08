import type { ItineraryActivity } from '@odyssey/shared';

export function ActivityBlock({ activity }: { activity: ItineraryActivity }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-medium">{activity.name}</h3>
          <p className="text-sm text-slate-300">
            {activity.category} · {activity.durationMinutes} min · ${activity.costUsd}
          </p>
        </div>
        <div className="text-right text-sm text-slate-200">
          <p>{activity.carbonKg}kg CO₂</p>
          <p>{activity.rating.toFixed(1)}★</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-300">{activity.note}</p>
    </article>
  );
}
