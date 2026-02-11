import { useEffect, useState } from 'react';
import { fetchProviderPlaceDetail } from '@/entities/place';
import type { ProviderPlaceDetail } from '@/entities/place';

export const useProviderPlaceEntry = (placeId: number) => {
  const [place, setPlace] = useState<ProviderPlaceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProviderPlaceDetail(placeId)
      .then(setPlace)
      .finally(() => setIsLoading(false));
  }, [placeId]);

  return {
    place,
    hasBoard: place?.hasBoard === true,
    isLoading,
  };
};
