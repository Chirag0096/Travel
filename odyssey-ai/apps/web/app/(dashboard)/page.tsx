import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {[
        {
          title: 'Plan a living itinerary',
          href: '/trips/new',
          copy: 'Launch the six-step ODYSSEY wizard with mood, carbon, and collaboration inputs.',
        },
        {
          title: 'Explore local pulse',
          href: '/pulse',
          copy: 'Inspect neighborhood pulse scores, hidden gems, and time-aware recommendations.',
        },
        {
          title: 'Understand your Travel DNA',
          href: '/profile',
          copy: 'Track archetype shifts, carbon history, and category preferences over time.',
        },
      ].map((card) => (
        <Link key={card.href} href={card.href} className="glass p-6 transition hover:border-sky-300/30">
          <h2 className="text-xl font-semibold">{card.title}</h2>
          <p className="mt-3 text-sm text-slate-300">{card.copy}</p>
        </Link>
      ))}
    </div>
  );
}

