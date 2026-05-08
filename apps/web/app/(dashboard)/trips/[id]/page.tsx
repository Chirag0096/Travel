'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AlternativesBanner } from '../../../../components/ai/AlternativesBanner';
import { DisruptionAlert } from '../../../../components/ai/DisruptionAlert';
import { TripMap } from '../../../../components/maps/TripMap';
import { ItineraryCanvas } from '../../../../components/planning/ItineraryCanvas';
import { ApiRequestError, apiClient } from '../../../../lib/api-client';
import { useTripStore } from '../../../../stores/tripStore';

export default function TripDetailPage() {
  const params = useParams<{ id: string }>();
  const trip = useTripStore((state) => state.latestTrip);
  const setLatestTrip = useTripStore((state) => state.setLatestTrip);
  const [loading, setLoading] = useState(!trip || trip.id !== params.id);
  const [risk, setRisk] = useState('low');
  const [loadFailed, setLoadFailed] = useState(false);
  const isValidTripId = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    params.id,
  );

  useEffect(() => {
    if (!isValidTripId) {
      setLoadFailed(true);
      setLoading(false);
      return;
    }

    async function loadTrip() {
      try {
        const response = await apiClient.getTrip(params.id);
        setLatestTrip(response.trip);
        setRisk(response.liveDisruptionStatus);
        setLoadFailed(false);
      } catch (error) {
        if (error instanceof ApiRequestError && error.status === 404) {
          setLoadFailed(true);
          return;
        }
        setLoadFailed(true);
      } finally {
        setLoading(false);
      }
    }

    if (!trip || trip.id !== params.id) {
      void loadTrip();
      return;
    }

    setRisk(trip.disruptionAlerts.find((item) => item.riskLevel !== 'low')?.riskLevel ?? 'low');
    setLoading(false);
  }, [isValidTripId, params.id, setLatestTrip, trip]);

  if (loading || !trip) {
    if (loadFailed) {
      return <div className="glass p-8">Unable to load this trip right now.</div>;
    }
    return <div className="glass p-8">Loading live trip canvas…</div>;
  }

  return (
    <section data-testid="trip-canvas" className="space-y-6">
      <DisruptionAlert risk={risk} alerts={trip.disruptionAlerts} />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ItineraryCanvas trip={trip} />
        <TripMap trip={trip} />
      </div>
      <AlternativesBanner alerts={trip.disruptionAlerts} />
    </section>
  );
}
