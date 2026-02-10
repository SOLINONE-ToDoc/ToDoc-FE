import { useCallback, useState } from 'react';
import { fetchAiFontRecommend } from '@/entities/font';
import type { FontRecommend } from '@/entities/font';

export const useFontRecommendation = (content: string) => {
  const [fonts, setFonts] = useState<FontRecommend[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getRecommendation = useCallback(async () => {
    if (!content) return;

    setIsLoading(true);
    try {
      const data = await fetchAiFontRecommend(content);
      setFonts(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [content]);

  return { fonts, isLoading, error, getRecommendation };
};
