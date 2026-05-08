import Link from 'next/link';

export default function LandingPage() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-300">
          Google Travel Planning Challenge
        </p>
        <h1 className="text-5xl font-semibold leading-tight sm:text-6xl">
          Your journey,
          <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">
            {' '}
            alive.
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-slate-300">
          Mood-aware itineraries, predictive disruption shielding, local pulse
          heatmaps, collaborative conflict resolution, and Travel DNA insights in
          one adaptive trip brain.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/trips/new"
            className="rounded-full bg-sky-400 px-6 py-3 font-medium text-slate-950"
          >
            Build a trip
          </Link>
          <Link href="/profile" className="rounded-full border border-white/15 px-6 py-3">
            Explore Travel DNA
          </Link>
        </div>
      </div>
      <div className="glass p-6">
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <p className="text-sm text-slate-400">Live competition demo slice</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            <li>• 6-step planning wizard</li>
            <li>• Dynamic trip canvas with live mood adaptation</li>
            <li>• Travel DNA radar view</li>
            <li>• Pulse heatmap and hidden gems</li>
            <li>• Price forecast and disruption alternatives</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

