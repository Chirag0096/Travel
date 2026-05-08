export function PageWrapper({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className="mx-auto max-w-7xl px-6 py-10">{children}</div>;
}
