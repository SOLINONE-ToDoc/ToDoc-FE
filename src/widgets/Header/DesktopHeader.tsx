import { ICONS } from "@/shared/constants";
import { Button } from "@/shared/ui/Button";

export const DesktopHeader = () => {
  const Logo = ICONS.Logo;
  return (
    <header className="relative w-[756px] h-[64px] mt-[44px] mx-auto">
      <div className="flex items-center justify-between pl-9 p-4 py-3 h-full bg-gray-200 rounded-full ">

        <Logo className="w-[48px] h-[34px]" />
        <div className="flex items-center gap-4">
          <Button
            variant="inversePrimary"
            size="lPill"
            type="button">
              편집하기
          </Button>
          <Button
            variant="plain"
            size="lPill"
            type="button">
              설정
          </Button>
          <Button
            variant="primary"
            size="lPill"
            type="button">
              로그인
          </Button>
        </div>
      </div>
    </header>
  );
};
