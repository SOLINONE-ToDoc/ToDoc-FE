import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { useThemeList } from '@/features/theme';
import { useCreateBoard } from '@/features/board';
import { SideThemePicker } from '@/shared/ui/SideThemePicker';
import { PreviewNoteList } from '@/widgets/Note';

export const BoardCreatePage = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();

  const { themes } = useThemeList();
  const [selectedThemeId, setSelectedThemeId] = React.useState<number | null>(null);

  const { createBoard } = useCreateBoard();

  const selectedTheme = themes.find(t => t.themeId === selectedThemeId);

  const handleCreate = async () => {
    if (!selectedThemeId || !placeId) return;

    const data = await createBoard({
      placeId: Number(placeId),
      themeId: selectedThemeId,
    });

    if (data) {
      navigate(`/place/${placeId}`, { replace: true });
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-50 overflow-hidden">
      <SideThemePicker
        themes={themes}
        selectedThemeId={selectedThemeId}
        onSelect={setSelectedThemeId}
      />

      <main className="flex-1 flex flex-col relative bg-[#F9F9F9]">
        <div className="flex-1 flex items-center justify-center">
          {selectedTheme ? (
            <div className="w-full max-w-[1000px] flex flex-col items-center">
              <PreviewNoteList themeUrls={selectedTheme.themeUrls} count={6} />

              <p className="mt-8 text-gray-400 font-medium">
                {selectedTheme.themeName}가 적용된 방명록 미리보기입니다.
              </p>
            </div>
          ) : (
            <div className="text-gray-300 text-[20px]">테마를 선택하면 미리보기가 나타납니다.</div>
          )}
        </div>

        <div className="h-[100px] bg-white border-t border-gray-200 flex items-center justify-end px-10">
          <Button
            size="lPill"
            disabled={!selectedThemeId}
            onClick={handleCreate}
          >
            이 테마로 방명록 생성하기
          </Button>
        </div>
      </main>
    </div>
  );
};
