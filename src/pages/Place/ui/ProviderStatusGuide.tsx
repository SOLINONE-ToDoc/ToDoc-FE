import { Button } from '@/shared/ui/Button';
import { GUIDE_ICONS } from '@/shared/constants';

interface ProviderStatusGuideProps {
  variant: 'noBoardProvider' | 'emptyBoardProvider';
  onAction?: () => void;
}

export const ProviderStatusGuide = ({ variant, onAction }: ProviderStatusGuideProps) => {
  const config = {
    noBoardProvider: {
      Icon: GUIDE_ICONS.Empty,
      title: '아직 방명록이 생성되지 않았습니다',
      description: '방명록 보드를 생성하고 손님들의 이야기를 들어보세요',
      buttonText: '방명록 생성하기',
    },

    emptyBoardProvider: {
      Icon: GUIDE_ICONS.Empty,
      title: '작성된 방명록이 없어요',
      description: '우측 상단 QR 코드를 통해 참여를 유도해보세요!',
      buttonText: null,
    },
  };

  const current = config[variant];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center gap-6">
      <current.Icon className="mb-2" />
      <div className='flex flex-col gap-2'>
        <div className="text-[28px] font-semibold">{current.title}</div>
        <p className="text-[18px] mb-8">{current.description}</p>
      </div>
      {current.buttonText && (
        <Button
          variant="ghost"
          size="lPill"
          type="button"
          onClick={onAction}
          className="px-10"
        >
          {current.buttonText}
        </Button>
      )}
    </div>
  );
};
