import { create } from 'zustand';
import type { WriteStore } from '@/entities/font';

export const useFontRecommendStore = create<WriteStore>((set) => ({
  content: '',
  recommendFonts: [],
  selectedFontId: null,
  setContent: (content) => set({ content }),
  setRecommendFonts: (fonts) => set({ recommendFonts: fonts }),
  setSelectedFontId: (id) => set({ selectedFontId: id }),
  reset: () => set({ content: '', recommendFonts: [], selectedFontId: null }),
}));
