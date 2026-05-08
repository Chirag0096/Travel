'use client';

export function PulseHeatmap({ geojson }: { geojson: Record<string, unknown> | null }) {
  return (
    <div className="glass p-6">
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
        <p className="text-sm text-slate-300">
          Heatmap overlay placeholder with accessible text fallback.
        </p>
        <pre className="mt-4 overflow-auto text-xs text-slate-400">
          {JSON.stringify(geojson, null, 2)}
        </pre>
      </div>
    </div>
  );
}

