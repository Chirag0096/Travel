export function Avatar({ label }: { label: string }): JSX.Element {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs">
      {label.slice(0, 2).toUpperCase()}
    </span>
  );
}
