import { useState, useEffect, useCallback } from 'react';
import type { BrifContent } from '@/entities/board';
import { fetchPlaceMyContent } from '../services/fetchPlaceMyContent';

export const usePlaceMyContents = (placeId: number | null) => {
  const [data, setData] = useState<BrifContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    if (!placeId) return;

    setIsLoading(true);
    setError(null);
    try {
      const contents = await fetchPlaceMyContent(placeId);
      setData(contents);
    } catch (err) {
      setError(err instanceof Error ? err.message : '방명록을 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [placeId]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return { data, isLoading, error, refetch: loadContent };
};
