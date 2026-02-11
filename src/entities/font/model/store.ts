import { create } from 'zustand';
import type { WriteStore, FontRecommend, AiFontRecommendResponse } from '@/entities/font';

export const useFontRecommendStore = create<WriteStore>((set) => ({
  content: '',
  recommendFonts: [],
  recommendThemeUrl: null,
  selectedFontId: null,
  selectedFont: null,

  setContent: (content) => set({ content }),

  setRecommendFonts: (fonts) => set({ recommendFonts: fonts }),

  setRecommendData: (data: AiFontRecommendResponse) => set({
    recommendFonts: data.fonts,
    recommendThemeUrl: data.themeUrl,
    selectedFont: data.fonts[0],
    selectedFontId: data.fonts[0].fontId
  }),

  setSelectedFontId: (id: number) => set({ selectedFontId: id }),

  setSelectedFont: (font: FontRecommend) => set({
    selectedFont: font,
    selectedFontId: font.fontId
  }),

  reset: () => set({
    content: '',
    recommendFonts: [],
    recommendThemeUrl: null,
    selectedFontId: null,
    selectedFont: null
  }),
}));
