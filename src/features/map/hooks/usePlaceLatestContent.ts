import { useState, useEffect, useCallback } from 'react';
import { fetchLatestPlaceContent } from '../services/fetchPlaceLatestContent';
import type { BrifContent } from '@/entities/board';

export const usePlaceLatestContent = (placeId: number | null) => {
  const [data, setData] = useState<BrifContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLatest = useCallback(async () => {
    if (!placeId) return;

    setIsLoading(true);
    setError(null);
    try {
      const contents = await fetchLatestPlaceContent(placeId);
      setData(contents);
    } catch (err) {
      setError(err instanceof Error ? err.message : '최신 방명록을 가져오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [placeId]);

  useEffect(() => {
    loadLatest();
  }, [loadLatest]);

  return {
    latestContents: data,
    isLoading,
    error,
    refetch: loadLatest
  };
};
