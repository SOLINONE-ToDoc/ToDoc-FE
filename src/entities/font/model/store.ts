import { create } from 'zustand';
import type { WriteStore, FontRecommend } from '@/entities/font';

export const useFontRecommendStore = create<WriteStore>((set) => ({
  content: '',
  recommendFonts: [],
  selectedFontId: null,
  selectedFont: null,
  setContent: (content) => set({ content }),
  setRecommendFonts: (fonts) => set({ recommendFonts: fonts }),
  setSelectedFontId: (id: number) => set({ selectedFontId: id }),
  setSelectedFont: (font: FontRecommend) => set({
    selectedFont: font,
    selectedFontId: font.fontId
  }),
  reset: () => set({ content: '', recommendFonts: [], selectedFontId: null }),
}));
