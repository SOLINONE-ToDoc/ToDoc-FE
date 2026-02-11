import { useCallback, useState } from 'react';
import { fetchAiFontRecommend } from '@/entities/font';
import { useFontRecommendStore } from '@/entities/font';

export const useFontRecommendation = (content: string, boardId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setRecommendData = useFontRecommendStore((state) => state.setRecommendData);

  const getRecommendation = useCallback(async () => {
    if (!content || !boardId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchAiFontRecommend(content, boardId);

      if (data) {
        setRecommendData(data);
      }
    } catch (err) {
      setError(err as Error);
      console.error('AI 추천 훅 에러:', err);
    } finally {
      setIsLoading(false);
    }
  }, [content, boardId, setRecommendData]);

  return { isLoading, error, getRecommendation };
};
