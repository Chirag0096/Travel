export function Tooltip({ text }: { text: string }): JSX.Element {
  return <span className="rounded bg-black/80 px-2 py-1 text-xs text-white">{text}</span>;
}
