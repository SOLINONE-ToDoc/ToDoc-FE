export type FontCategory =
  | 'CUTE'
  | 'RETRO'
  | 'EMOTIONAL'
  | 'UNIQUE'
  | 'RIGID'
  | 'SERIOUS'
  | 'ELEGANT'
  | 'MODERN'
  | 'LYRICAL'
  | 'SCARY'
  | 'LIGHT';

export interface FontRecommend {
  fontId: number;
  fontName: string;
  fontNameEng: string;
  category: FontCategory;
  field: string;
  reason: string;
}
export interface WriteStore {
  content: string;
  recommendFonts: FontRecommend[];
  selectedFontId: number | null;
  selectedFont: FontRecommend | null;
  setContent: (content: string) => void;
  setRecommendFonts: (fonts: FontRecommend[]) => void;
  setSelectedFontId: (id: number) => void;
  setSelectedFont: (font: FontRecommend) => void;
  reset: () => void;
}

export interface FontInfo {
  fontId: number;
  fontName: string;
  fontNameEng: string;
  category: FontCategory;
  field: string;
  tailwindClass: string;
  src: string;
}
