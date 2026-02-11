import { useParams, useNavigate } from 'react-router-dom';
import { RandomNotes } from '@/widgets/Note';
import { useProviderBoard } from '@/entities/board';
import { QrButton, LiveTag } from './ui'
import { useFontPreload } from '@/shared/hooks';
import { useProviderPlaceEntry } from '@/features/provider';
import { ProviderStatusGuide } from './ui/ProviderStatusGuide';

export const ProviderView = () => {
  const navigate = useNavigate();
  const { placeId } = useParams<{ placeId: string }>();
  const id = Number(placeId);

  const { hasBoard, isLoading } = useProviderPlaceEntry(id);
  const { contents, qrUrl } = useProviderBoard(id);

  console.log(`Board Status for Place[${id}]:`, {
    hasBoard,
    contentsCount: contents.length,
    qrUrl: qrUrl ? 'Present' : 'Empty'
  });

  const fontIds = contents.map(c => c.fontId);
  useFontPreload(fontIds);

  if (isLoading) return null;

  const handleAction = () => {
    if (!hasBoard) {
      navigate(`/place/${id}/create`);
    }
  };

  const renderContent = () => {
    if (!hasBoard) {
      return <ProviderStatusGuide variant="noBoardProvider" onAction={handleAction}/>;
    }
    if (contents.length === 0) {
      return <ProviderStatusGuide variant="emptyBoardProvider" onAction={handleAction}/>;
    }
    return <RandomNotes contents={contents} />;
  };

  return (
    <div className="w-full h-screen bg-[#F9F9F9] relative">
      {renderContent()}

      {hasBoard && (
        <>
          <div className="fixed right-[46px] top-[44px] z-[9999]">
            <QrButton qrUrl={qrUrl} />
          </div>
          <div className="fixed right-[46px] bottom-[44px] z-[9999]">
            <LiveTag />
          </div>
        </>
      )}
    </div>
  );
};
