import { ICONS } from '@/shared/constants';

export const LoginHeader = () => {
  const Logo = ICONS.Logo;

  return (
    <div className="flex flex-col items-start justify-center mb-10 lg:mb-20 w-full">
      <Logo className="w-[85px] h-[56px] mb-4" />
      <h1 className="text-body-2 font-medium lg:text-[18px] text-left tracking-tight">방명록으로 기록한 고객 목소리</h1>
    </div>
  );
};
