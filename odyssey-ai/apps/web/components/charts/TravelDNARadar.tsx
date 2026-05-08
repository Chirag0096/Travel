'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import type { TravelDNA } from '@odyssey/shared';

export function TravelDNARadar({ dna }: { dna: TravelDNA }) {
  const data = Object.entries(dna).map(([axis, value]) => ({
    axis,
    value: Math.round(value * 100),
  }));

  return (
    <div className="glass p-6">
      <h2 className="text-xl font-semibold">Travel DNA radar</h2>
      <div className="h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.15)" />
            <PolarAngleAxis dataKey="axis" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
            <Radar dataKey="value" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
