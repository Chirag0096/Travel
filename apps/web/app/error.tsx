'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl p-8">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="mt-3 text-slate-300">
        We could not complete this action. Please retry, or refresh the page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-sky-400 px-5 py-2 font-medium text-slate-950"
      >
        Try again
      </button>
    </div>
  );
}
