'use client';

import { useEffect, useState } from 'react';
import { TravelDNARadar } from '../../../components/charts/TravelDNARadar';
import { apiClient } from '../../../lib/api-client';

type ProfileResponse = Awaited<ReturnType<typeof apiClient.getProfile>>;

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);

  useEffect(() => {
    void apiClient.getProfile().then(setProfile);
  }, []);

  if (!profile) {
    return <div className="glass p-6">Loading Travel DNA…</div>;
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="glass p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Travel DNA</p>
        <h1 className="mt-3 text-3xl font-semibold">{profile.archetype}</h1>
        <p className="mt-2 text-sm text-slate-300">
          Carbon footprint {profile.stats.totalCarbonFootprintKg}kg ·{' '}
          {profile.stats.countriesVisited} countries explored
        </p>
      </div>
      <TravelDNARadar dna={profile.dna} />
    </section>
  );
}
