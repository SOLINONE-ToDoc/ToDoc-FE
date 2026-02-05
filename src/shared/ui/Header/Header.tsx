import { MobileHeader } from './MobileHeader';
import { DesktopHeader } from './DesktopHeader';

export const Header = () => {
  return (
    <>
      <div className="lg:hidden">
        <MobileHeader />
      </div>

      <div className="hidden lg:block">
        <DesktopHeader />
      </div>
    </>
  );
};
