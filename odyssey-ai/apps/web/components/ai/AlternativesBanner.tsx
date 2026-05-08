import type { DisruptionPrediction } from '@odyssey/shared';

export function AlternativesBanner({
  alerts,
}: {
  alerts: DisruptionPrediction[];
}) {
  return (
    <div className="glass p-5">
      <h2 className="text-xl font-semibold">Alternative branches</h2>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-2xl border border-white/10 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              {alert.type.replace('_', ' ')}
            </p>
            <h3 className="mt-2 font-medium">{alert.alternativeTitle}</h3>
            <p className="mt-2 text-sm text-slate-300">{alert.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
