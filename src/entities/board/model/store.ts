import { create } from 'zustand';
import type { WriteStore } from './types';

export const useWriteStore = create<WriteStore>((set) => ({
  content: '',
  setContent: (content) => set({ content }),
  reset: () => set({ content: '' }),
}));
