import type { PriceForecast } from '@odyssey/shared';

export function PriceChart({ forecast }: { forecast: PriceForecast }) {
  return (
    <div className="glass p-6">
      <h2 className="text-xl font-semibold">Price intelligence</h2>
      <p className="mt-2 text-sm text-slate-300">
        Book in the next {forecast.optimalBookingDaysAhead} days to catch the current statistical
        valley.
      </p>
    </div>
  );
}
