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

  // 2. 사장님(PROVIDER)인 경우
  if (userInfo?.role === 'PROVIDER') {
    // 나중에 가게 선택이 안 되어 있을 때의 로직(ProviderBoardCreatePage 등)을
    // 여기서 분기하거나 ProviderView 내부에서 처리하면 됩니다.
    return <ProviderView />;
  }

  // 3. 방문자(VISITOR)인 경우
  return <VisitorView />;
};
