import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlaceState {
  lastSelectedPlaceId: number | null;
  setLastSelectedPlaceId: (id: number | null) => void;
  resetPlace: () => void;
}

export const usePlaceStore = create<PlaceState>()(
  persist(
    (set) => ({
      lastSelectedPlaceId: null,
      setLastSelectedPlaceId: (id) => set({ lastSelectedPlaceId: id }),
      resetPlace: () => set({ lastSelectedPlaceId: null }),
    }),
    {
      name: 'place-storage',
    }
  )
);
