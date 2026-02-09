import { useParams } from 'react-router-dom';
import { RandomNotes } from '@/widgets/Note';
import { useBoardStream } from '@/entities/board';

export const ProviderView = () => {

  // 기존 목록 물러오기 추가해야함
  const { placeId } = useParams<{ placeId: string }>();
  const streamContents = useBoardStream(placeId ? Number(placeId) : null);

return (
    <div className="w-full h-screen overflow-hidden bg-[#F9F9F9] relative">
      {streamContents.length > 0 ? (
        <RandomNotes contents={streamContents} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
          <p className="text-lg font-medium">아직 도착한 방명록이 없어요.</p>
          <p className="text-sm">손님들이 글을 남기면 여기에 실시간으로 나타납니다!</p>
        </div>
      )}
    </div>
  );
};
