import type { CarbonComparison } from '@odyssey/shared';

export function RouteComparison({ comparison }: { comparison: CarbonComparison }) {
  return (
    <div className="glass p-6">
      <h2 className="text-xl font-semibold">Route comparison</h2>
      <div className="mt-4 space-y-3">
        {comparison.routes.map((route) => (
          <div key={route.mode} className="rounded-2xl border border-white/10 p-4">
            <div className="flex items-center justify-between">
              <span className="capitalize">{route.mode}</span>
              <span>{route.carbonKg}kg CO₂</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
