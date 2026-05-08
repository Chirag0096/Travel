export function Badge({ children }: { children: React.ReactNode }): JSX.Element {
  return <span className="rounded-full border border-white/15 px-3 py-1 text-xs">{children}</span>;
}
