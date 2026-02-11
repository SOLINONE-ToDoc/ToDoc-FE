import { useAuthStore } from '@/entities/auth';
import { ProviderView } from './ProviderView';
import { VisitorView } from './VisitorView';

export const PlacePage = () => {
  const { userInfo } = useAuthStore();

  if (!userInfo) {
    console.warn('사용자 찾을 수 없음');
    return <VisitorView />;
  }

  if (userInfo.role === 'PROVIDER') {
    return <ProviderView />;
  }

  return <VisitorView />;
};
