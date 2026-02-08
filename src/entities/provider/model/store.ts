import { create } from 'zustand';
import type { ProviderPlace } from './types';
import { fetchProviderPlaceList } from '@/features/auth';

interface ProviderState {
  places: ProviderPlace[];
  selectedPlace: ProviderPlace | null;
  setPlaces: (places: ProviderPlace[]) => void;
  setSelectedPlace: (place: ProviderPlace) => void;
  fetchPlaces: () => Promise<void>;
}

export const useProviderStore = create<ProviderState>((set) => ({
  places: [],
  selectedPlace: null,

  setPlaces: (places) =>
    set({
      places,
      selectedPlace: places[0] ?? null,
    }),

  setSelectedPlace: (place) => set({ selectedPlace: place }),

  fetchPlaces: async () => {
    const places = await fetchProviderPlaceList();
    set({
      places,
      selectedPlace: places[0] ?? null,
    });
  },
}));
