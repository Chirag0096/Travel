import { googleMapsLibraries } from '../lib/google-maps';
import { GOOGLE_MAPS_PUBLIC_KEY } from '../config/constants';

export function useGoogleMaps(): { apiKey: string; libraries: readonly string[] } {
  return {
    apiKey: GOOGLE_MAPS_PUBLIC_KEY,
    libraries: googleMapsLibraries,
  };
}
