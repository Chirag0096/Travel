import type { ItineraryDay } from '@odyssey/shared';
import { ActivityBlock } from './ActivityBlock';

export function DayCard({ day }: { day: ItineraryDay }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Day {day.dayIndex + 1}</h2>
          <p className="text-sm text-slate-300">{day.theme}</p>
        </div>
        <div className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200">
          Today&apos;s energy: {Math.round((day.mood?.energy ?? 0.55) * 100)}%
        </div>
      </div>
      <div className="space-y-3">
        {day.activities.map((activity) => (
          <ActivityBlock key={activity.id} activity={activity} />
        ))}
      </div>
    </section>
  );
}
