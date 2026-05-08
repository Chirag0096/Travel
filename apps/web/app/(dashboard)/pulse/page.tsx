'use client';

import { useEffect, useState } from 'react';
import { PulseHeatmap } from '../../../components/maps/PulseHeatmap';
import { apiClient } from '../../../lib/api-client';

export default function PulsePage() {
  const [heatmap, setHeatmap] = useState<Record<string, unknown> | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    void apiClient
      .getPulseHeatmap('mock-place-bangkok')
      .then((data) => {
        setHeatmap(data);
        setLoadFailed(false);
      })
      .catch(() => {
        setLoadFailed(true);
      });
  }, []);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
          Hyper-contextual local pulse
        </p>
        <h1 className="mt-3 text-4xl font-semibold">
          Find the right hour, not just the right place
        </h1>
      </div>
      {loadFailed ? (
        <p aria-live="polite" className="text-sm text-rose-300">
          Pulse heatmap data could not be loaded. Please refresh and try again.
        </p>
      ) : null}
      <PulseHeatmap geojson={heatmap} />
    </section>
  );
}
