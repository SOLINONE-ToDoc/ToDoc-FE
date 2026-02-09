import { useAuthStore } from '@/entities/auth';
import { VisitorView } from './ui/VisitorView';
import { ProviderView } from './ui/ProviderView';
// import { useProviderStore } from '@/entities/provider';
// import { ProviderBoardCreatePage } from './ui/ProviderBoardCreatePage';

export const DashboardPage = () => {
  const { userInfo } = useAuthStore();
  // const { selectedPlace } = useProviderStore();

  if (userInfo?.role === 'PROVIDER') {
    // if (!selectedPlace) return <ProviderBoardCreatePage />;

    // if (!selectedPlace.hasBoard || !selectedPlace.board) {
    //   return <ProviderBoardCreatePage placeName={selectedPlace.placeName} />;
    // }

    // return <ProviderView contents={selectedPlace.board.contents} />;
    return <ProviderView />;
  }

  return <VisitorView />;
};
