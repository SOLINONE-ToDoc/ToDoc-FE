import { useEffect } from 'react';
import { fontLoader } from '@/shared/lib/fontLoader';
import type { FontId } from '@/shared/constants/fonts';

export const useFont = (fontId?: FontId) => {
  useEffect(() => {
    if (!fontId) return;
    fontLoader.load(fontId);
  }, [fontId]);
};
