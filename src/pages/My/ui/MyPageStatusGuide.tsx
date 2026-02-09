import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { ICONS } from '@/shared/constants';

interface MyPageStatusGuideProps {
  variant: 'login' | 'empty';
}

export const MyPageStatusGuide = ({ variant }: MyPageStatusGuideProps) => {
  const navigate = useNavigate();

  const config = {
    login: {
      Icon: ICONS.Login,
      title: "로그인이 필요한 서비스입니다",
      description: "로그인 후 방명록을 저장해보세요",
      buttonText: "로그인하기",
      onAction: () => navigate('/login'),
    },
    empty: {
      Icon: ICONS.Empty,
      title: "작성한 내 방명록이 없어요",
      description: "방명록이 있는 매장에 내 기록을 남겨보세요",
      buttonText: "방명록 매장 찾아보기",
      onAction: () => navigate('/map'),
    },
  };

  const current = config[variant];

  return (
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 mt-[32px]">
        <current.Icon className="mb-2" />
        <div className="text-heading-1 font-semibold">
          {current.title}
        </div>
        <p className="text-gray-500 text-body-2 mb-8">
          {current.description}
        </p>
        <Button
          variant="outline"
          size="pill"
          type="button"
          onClick={current.onAction}
        >
          <span>{current.buttonText}</span>
        </Button>
      </div>
  );
};
