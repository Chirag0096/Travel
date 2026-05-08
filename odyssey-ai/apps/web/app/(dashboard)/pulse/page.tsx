'use client';

import { useEffect, useState } from 'react';
import { PulseHeatmap } from '../../../components/maps/PulseHeatmap';
import { apiClient } from '../../../lib/api-client';

export default function PulsePage() {
  const [heatmap, setHeatmap] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    void apiClient.getPulseHeatmap('mock-place-bangkok').then(setHeatmap);
  }, []);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
          Hyper-contextual local pulse
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Find the right hour, not just the right place</h1>
      </div>
      <PulseHeatmap geojson={heatmap} />
    </section>
  );
}

