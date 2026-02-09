import { useState, useEffect, useCallback } from 'react';
import { fetchMyPageContents } from '../service/fetchMyPageContents';
import type { BrifContent } from '@/entities/board';

export const useMyPageContents = () => {
  const [contents, setContents] = useState<BrifContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMyContents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMyPageContents();
      setContents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '기록을 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMyContents();
  }, [loadMyContents]);

  return { contents, isLoading, error, refetch: loadMyContents };
};
