import { useEffect, useState } from 'react';
import { fetchThemeList } from '@/entities/theme';
import type { Theme } from '@/entities/theme';

export const useThemeList = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchThemeList();
        if (mounted) setThemes(data);
      } catch (e) {
        if (mounted) {
          setError(
            e instanceof Error ? e.message : '테마 조회에 실패했어요.'
          );
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { themes, isLoading, error };
};
