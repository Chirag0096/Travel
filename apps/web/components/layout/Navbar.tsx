import Link from 'next/link';

export function Navbar(): JSX.Element {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-semibold tracking-[0.3em]">
          ODYSSEY AI
        </Link>
        <nav className="flex gap-4 text-sm text-slate-300">
          <Link href="/trips/new">Plan</Link>
          <Link href="/pulse">Pulse</Link>
          <Link href="/discover">Discover</Link>
          <Link href="/profile">DNA</Link>
        </nav>
      </div>
    </header>
  );
}
