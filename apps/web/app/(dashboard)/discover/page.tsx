'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { apiClient } from '../../../lib/api-client';

type MatchCard = {
  id: string;
  name: string;
  confidence: number;
  summary: string;
  photoUrl: string;
};

export default function DiscoverPage() {
  const [matches, setMatches] = useState<MatchCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleMatch() {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await apiClient.matchDestination();
      setMatches(response.matches);
    } catch {
      setErrorMessage('Destination matching is unavailable right now. Please retry.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Visual destination match</p>
        <h1 className="mt-3 text-4xl font-semibold">Turn a vibe into a trip</h1>
      </div>
      <div className="glass space-y-4 p-6">
        <button
          type="button"
          onClick={handleMatch}
          disabled={loading}
          className="rounded-full bg-sky-400 px-6 py-3 font-medium text-slate-950"
        >
          {loading ? 'Analyzing…' : 'Simulate image analysis'}
        </button>
        {errorMessage ? (
          <p aria-live="polite" className="text-sm text-rose-300">
            {errorMessage}
          </p>
        ) : null}
        <div className="grid gap-4 lg:grid-cols-2">
          {matches.map((match) => (
            <div key={match.id} className="overflow-hidden rounded-3xl border border-white/10">
              <Image
                src={match.photoUrl}
                alt={match.name}
                width={1200}
                height={600}
                className="h-56 w-full object-cover"
              />
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{match.name}</h2>
                  <span className="text-sm text-sky-300">
                    {Math.round(match.confidence * 100)}%
                  </span>
                </div>
                <p className="text-sm text-slate-300">{match.summary}</p>
                <Link href="/trips/new" className="text-sm text-sky-300">
                  Build trip →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
