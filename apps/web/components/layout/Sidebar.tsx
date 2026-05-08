import Link from 'next/link';

export function Sidebar(): JSX.Element {
  return (
    <aside className="hidden w-56 border-r border-white/10 p-4 lg:block" aria-label="Sidebar">
      <ul className="space-y-3 text-sm text-slate-300">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/trips/new">New Trip</Link>
        </li>
        <li>
          <Link href="/discover">Discover</Link>
        </li>
        <li>
          <Link href="/pulse">Pulse</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </aside>
  );
}
