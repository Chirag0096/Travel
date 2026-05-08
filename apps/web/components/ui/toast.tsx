export function Toast({ message }: { message: string }): JSX.Element {
  return (
    <div role="status" className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm">
      {message}
    </div>
  );
}
