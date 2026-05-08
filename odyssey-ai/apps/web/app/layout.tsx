import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { QueryProvider } from '../components/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'ODYSSEY AI',
  description: 'Your journey, alive.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="absolute left-4 top-4 z-50 rounded-full bg-slate-900 px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute"
        >
          Skip to content
        </a>
        <QueryProvider>
          <div className="min-h-screen">
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
            <main id="main-content">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}

