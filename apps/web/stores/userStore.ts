import { create } from 'zustand';
import type { TravelDNA } from '@odyssey/shared';

type UserStore = {
  displayName: string;
  travelDNA: TravelDNA | null;
  setTravelDNA: (travelDNA: TravelDNA) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  displayName: 'Demo Traveler',
  travelDNA: null,
  setTravelDNA: (travelDNA) => set({ travelDNA }),
}));
