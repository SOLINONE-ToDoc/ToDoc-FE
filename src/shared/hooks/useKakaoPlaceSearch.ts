import { useState, useCallback } from 'react';
import type { KakaoPlace } from '@/shared/types';

type SearchStatus = 'idle' | 'loading' | 'success' | 'error';

export const useKakaoPlaceSearch = () => {
  const [results, setResults] = useState<KakaoPlace[]>([]);
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const search = useCallback((keyword: string) => {
    if (!keyword.trim()) return;

    if (!window.kakao?.maps?.services) {
      setError('카카오맵 SDK가 로드되지 않았습니다.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError(null);

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setResults(data as KakaoPlace[]);
        setStatus('success');
        return;
      }

      if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        setResults([]);
        setStatus('success');
        return;
      }

      setError('검색 중 오류가 발생했습니다.');
      setStatus('error');
    });
  }, []);

  const reset = useCallback(() => {
    setResults([]);
    setStatus('idle');
    setError(null);
  }, []);

  return {
    results,
    status,
    isLoading: status === 'loading',
    error,
    search,
    reset,
  };
};
