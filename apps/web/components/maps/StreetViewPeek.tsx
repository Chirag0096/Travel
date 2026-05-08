import Image from 'next/image';

export function StreetViewPeek({ imageUrl }: { imageUrl: string }): JSX.Element {
  return (
    <div className="rounded-2xl border border-white/10 p-3">
      <Image
        src={imageUrl}
        alt="Street view preview"
        width={640}
        height={240}
        className="h-36 w-full rounded-xl object-cover"
      />
    </div>
  );
}
