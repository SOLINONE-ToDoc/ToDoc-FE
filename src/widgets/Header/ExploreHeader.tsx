import { useNavigate } from "react-router-dom";
import { usePlaceStore } from "@/entities/place";
import { ICONS } from "@/shared/constants";

export const ExploreHeader = () => {
  const Logo = ICONS.Logo;
  const navigate = useNavigate();
  const { lastSelectedPlaceId } = usePlaceStore();

  return (
    <header className="fixed lg:hidden top-0 left-0 w-full z-50 pt-[env(safe-area-inset-top)]">
      <div
        className="absolute top-0 left-0 w-full h-[120px] "
      />
      <div className="relative flex flex-col bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_60%,rgba(255,255,255,0)_100%)]">
        <div className="flex items-start h-[44px] justify-between mt-5 px-5">
          <button onClick={() => navigate('/')} className="p-0 m-0 bg-transparent border-0 cursor-pointer">
              <Logo width={43} height={24} />
          </button>
          <ICONS.Setting width={24} height={24} />
        </div>

        <nav className="text-[20px] font-semibold flex items-start h-[60px] gap-4 px-5 relative z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_50%,rgba(255,255,255,0)_100%)]">
          <button
            className="hover:text-content-muted"
            onClick={() => navigate(`/place/${lastSelectedPlaceId}`)}
          >
            보드
          </button>
          <button
            className="hover:text-content-muted"
            onClick={() => navigate('/map')}
          >
            지도
          </button>
          <button
            className="hover:text-content-muted"
            onClick={() => navigate('/my')}
          >
            내 방명록
            </button>
        </nav>
      </div>
    </header>
  );
};
