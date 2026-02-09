// import { MobileHeader } from './MobileHeader';
import { DesktopHeader } from './DesktopHeader';

export const Header = () => {
  return (
    <>
      {/* <div className="lg:hidden">
        <MobileHeader />
      </div> */}

      <div className="fixed hidden lg:block z-[9999] left-1/2 -translate-x-1/2 top-0">
        <DesktopHeader />
      </div>
    </>
  );
};
