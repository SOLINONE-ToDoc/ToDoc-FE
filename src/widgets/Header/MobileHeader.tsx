import { ICONS } from "@/shared/constants";

export const MobileHeader = () => {
  const Logo = ICONS.Logo;

  return (
    <header className="w-full pt-[env(safe-area-inset-top)]">
      <div className="flex items-center justify-between py-1 px-5">

        <Logo className="w-[43px] h-[32px]" />
        <div className="flex items-end">
          <ICONS.Setting width={24} height={24} />
        </div>
      </div>
    </header>
  );
};
