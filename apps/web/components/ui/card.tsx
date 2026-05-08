export function Card({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className="rounded-3xl border border-white/10 bg-white/5 p-6">{children}</div>;
}
