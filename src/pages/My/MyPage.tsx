import { useMyPageContents } from '@/features/my';
import { useAuthStore } from '@/entities/auth';
import { MyNoteList } from './ui/MyNoteList';
import { cn } from '@/shared/lib';

export const MyPage = () => {
  const { userInfo } = useAuthStore();
  const { contents, isLoading } = useMyPageContents();

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
