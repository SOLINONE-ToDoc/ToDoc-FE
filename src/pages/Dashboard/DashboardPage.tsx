import { useEffect } from 'react';
import { useAuthStore } from '@/entities/auth';
import { VisitorView } from './ui/VisitorView';
import { ProviderView } from './ui/ProviderView';
import { useCurrentLocation } from '@/features/map';
// import { useProviderStore } from '@/entities/provider';

export const DashboardPage = () => {
  const { userInfo } = useAuthStore();
  const { status, handleLocation } = useCurrentLocation();
  // const { selectedPlace } = useProviderStore();

  useEffect(() => {
    if (userInfo?.role !== 'PROVIDER' && status === 'idle') {
      handleLocation();
    }
  }, [userInfo, status, handleLocation]);

  if (userInfo?.role === 'PROVIDER') {
    return <ProviderView />;
  }

  return <VisitorView />;
};
