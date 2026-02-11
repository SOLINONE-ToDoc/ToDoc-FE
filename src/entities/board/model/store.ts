import { create } from 'zustand';
import type { WriteStore } from './types';

export const useWriteStore = create<WriteStore>((set) => ({
  content: '',
  createdAt: null,
  setContent: (content) => set({ content }),
  setCreatedAt: (date) => set({ createdAt: date }),
  reset: () => set({
    content: '',
    createdAt: null
  }),
}));
