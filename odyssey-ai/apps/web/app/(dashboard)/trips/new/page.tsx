'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MoodSelector } from '../../../../components/planning/MoodSelector';
import { apiClient } from '../../../../lib/api-client';
import { useTripStore } from '../../../../stores/tripStore';

const moods = [
  '😴 Tired',
  '😌 Calm',
  '😃 Excited',
  '😟 Anxious',
  '🤩 Thrilled',
  '😊 Content',
  '🧘 Reflective',
  '🎉 Celebratory',
  '🔥 Energised',
];

export default function NewTripPage() {
  const router = useRouter();
  const setLatestTrip = useTripStore((state) => state.setLatestTrip);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState('Bangkok, Thailand');
  const [budget, setBudget] = useState(1200);
  const [selectedMood, setSelectedMood] = useState('😌 Calm');
  const [preferences, setPreferences] = useState({
    adventure: 0.55,
    culture: 0.8,
    comfort: 0.6,
    sustainability: 0.72,
    food: 0.75,
    pace: 0.48,
  });

  const moodVector = useMemo(() => {
    if (selectedMood.includes('Tired')) {
      return { energy: 0.28, anxiety: 0.4, excitement: 0.35 };
    }
    if (selectedMood.includes('Anxious')) {
      return { energy: 0.42, anxiety: 0.78, excitement: 0.33 };
    }
    if (selectedMood.includes('Thrilled') || selectedMood.includes('Energised')) {
      return { energy: 0.85, anxiety: 0.2, excitement: 0.9 };
    }

    return { energy: 0.58, anxiety: 0.24, excitement: 0.68 };
  }, [selectedMood]);

  async function generateTrip() {
    setLoading(true);
    const response = await apiClient.planTrip({
      destination,
      startDate: new Date('2026-07-12T00:00:00.000Z').toISOString(),
      endDate: new Date('2026-07-15T00:00:00.000Z').toISOString(),
      travelerCount: 2,
      budget,
      mood: moodVector,
      preferences,
      constraints: {
        avoidCrowds: true,
        mobilityRestrictions: false,
        dietaryRestrictions: ['vegetarian'],
        maxWalkingKm: 8,
      },
      collaborators: [],
      carbonMode: 'balanced',
    });

    setLatestTrip(response.trip);
    setLoading(false);
    router.push(`/trips/${response.trip.id}`);
  }

  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
          Trip creation wizard
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Build a living itinerary</h1>
      </div>
      <div className="glass min-h-[620px] overflow-hidden p-6">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Step 1 — Destination & dates</h2>
              <input
                data-testid="destination-search"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                aria-label="Destination search"
              />
              <p className="text-sm text-slate-300">
                Price forecast overlay: Prices are 12% below typical peak-week
                patterns for this window.
              </p>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Step 2 — Mood check-in</h2>
              <MoodSelector
                moods={moods}
                selectedMood={selectedMood}
                onSelect={setSelectedMood}
              />
              <p className="text-sm text-slate-300">
                Based on your mood, we&apos;ll prioritize quieter experiences this
                morning.
              </p>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Step 3 — Travel DNA sliders</h2>
              {Object.entries(preferences).map(([key, value]) => (
                <label key={key} className="block">
                  <div className="mb-2 flex justify-between text-sm text-slate-300">
                    <span className="capitalize">{key}</span>
                    <span>{Math.round(value * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(value * 100)}
                    onChange={(event) =>
                      setPreferences((current) => ({
                        ...current,
                        [key]: Number(event.target.value) / 100,
                      }))
                    }
                    className="w-full"
                  />
                </label>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Step 4 — Constraints & budget</h2>
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">
                  Budget estimate (${budget})
                </span>
                <input
                  type="range"
                  min={400}
                  max={4000}
                  value={budget}
                  onChange={(event) => setBudget(Number(event.target.value))}
                  className="w-full"
                />
              </label>
              <p className="text-sm text-slate-300">
                Carbon mode is set to balanced with crowd avoidance enabled.
              </p>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Step 5 — Collaboration</h2>
              <div className="rounded-3xl border border-dashed border-white/20 p-6 text-sm text-slate-300">
                Share link, QR code, and invite-email surface will plug into Firebase
                notifications and presence.
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Step 6 — AI generation</h2>
              <div className="rounded-3xl border border-sky-300/30 bg-sky-400/10 p-6">
                <p className="text-sm text-sky-100">
                  ODYSSEY AI is analyzing activities, optimizing routes, checking
                  disruptions, and personalizing your narrative.
                </p>
              </div>
              <button
                type="button"
                onClick={generateTrip}
                disabled={loading}
                className="rounded-full bg-sky-400 px-6 py-3 font-medium text-slate-950"
              >
                {loading ? 'Generating…' : 'Generate trip'}
              </button>
            </div>
          )}
        </motion.div>
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            className="rounded-full border border-white/10 px-5 py-2"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep((current) => Math.min(5, current + 1))}
            className="rounded-full bg-white/10 px-5 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

