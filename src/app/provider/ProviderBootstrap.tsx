import { useEffect } from 'react';
import { useAuthStore } from '@/entities/auth';
import { useProviderStore } from '@/entities/provider';

export const ProviderBootstrap = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAuthStore();
  const { places, fetchPlaces } = useProviderStore();

  const isProvider = userInfo?.role === 'PROVIDER';

  useEffect(() => {
    if (isProvider && places.length === 0) {
      fetchPlaces();
    }
  }, [isProvider, places.length, fetchPlaces]);

  return <>{children}</>;
};
