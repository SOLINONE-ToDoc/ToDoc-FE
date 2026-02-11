import { create } from 'zustand';
import type { WriteStore } from './types';

export const useWriteStore = create<WriteStore>((set) => ({
  boardId: null,
  content: '',
  createdAt: null,
  orderNumber: null,
  setBoardId: (id) => set({ boardId: id }),
  setContent: (content) => set({ content }),
  setCreatedAt: (date) => set({ createdAt: date }),
  setOrderNumber: (num) => set({ orderNumber: num }),
  reset: () => set({
    boardId: null,
    content: '',
    createdAt: null,
    orderNumber: null,
  }),
}));
