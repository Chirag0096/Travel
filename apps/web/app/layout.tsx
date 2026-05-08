import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '../components/layout/Navbar';

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
        <div className="min-h-screen">
          <Navbar />
          <main id="main-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
