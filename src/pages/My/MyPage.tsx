import { useMyPageContents } from '@/features/my';
import { useAuthStore } from '@/entities/auth';
import { MyNoteList } from './ui/MyNoteList';
import { cn } from '@/shared/lib';
import { MyPageStatusGuide } from './ui/MyPageStatusGuide';

export const MyPage = () => {
  const { userInfo } = useAuthStore();
  const { contents = [], isLoading } = useMyPageContents();

  if (!userInfo) {
    return (
    <div className="flex flex-col w-full min-h-[calc(100vh-112px)] mt-[112px] px-5 pb-20">
      <h3 className="flex h-[76px] items-center text-title font-semibold">
        로그인이 필요해요
      </h3>
        <MyPageStatusGuide variant="login" />
    </div>
    );
  }

  if (!isLoading && contents.length === 0) {
    return (
    <div className="flex flex-col w-full min-h-[calc(100vh-112px)] mt-[112px] px-5 pb-20">
      <h3 className="flex h-[76px] items-center text-title font-semibold">
        {userInfo?.nickname}님
      </h3>
        <MyPageStatusGuide variant="empty" />
    </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full mt-[112px] px-5 pb-20">
      <div className={cn(
        "w-full transition-all duration-300",
        "max-w-[352px]",
        "min-[576px]:max-w-[536px]",
        "min-[760px]:max-w-[720px]",
        "min-[944px]:max-w-[904px]",
      )}>
      <h3 className="flex h-[76px] items-center text-title font-semibold">
        {userInfo?.nickname}님
      </h3>
        <div className="flex items-center mb-4">
          <div className="text-gray-600 font-medium text-caption">
            총 {contents.length}개
          </div>
        </div>

        <div className="mt-1 mx-auto">
          <MyNoteList contents={contents} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
