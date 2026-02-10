import { create } from 'zustand';
import type { LocationState } from '@/entities/map';

export const useLocationStore = create<LocationState>((set) => ({
  coords: null,
  status: 'idle',
  setCoords: (coords) => set({ coords }),
  setStatus: (status) => set({ status }),
}));
