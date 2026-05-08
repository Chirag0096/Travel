import type { DisruptionPrediction } from '@odyssey/shared';

export function DisruptionAlert({
  risk,
  alerts,
}: {
  risk: string;
  alerts: DisruptionPrediction[];
}) {
  const color =
    risk === 'high'
      ? 'bg-rose-500/20 text-rose-100'
      : risk === 'medium'
        ? 'bg-amber-400/20 text-amber-100'
        : 'bg-emerald-400/20 text-emerald-100';

  return (
    <div className={`glass flex items-center justify-between p-4 ${color}`}>
      <div>
        <p className="text-sm uppercase tracking-[0.3em]">Predictive disruption shield</p>
        <p className="mt-1 text-sm">
          {alerts[0]?.summary ?? 'No immediate disruptions forecasted.'}
        </p>
      </div>
      <div className="rounded-full border border-current/30 px-4 py-2 text-sm">
        {risk.toUpperCase()}
      </div>
    </div>
  );
}
