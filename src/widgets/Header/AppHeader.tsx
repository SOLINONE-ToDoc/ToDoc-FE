import { useNavigate, useLocation } from 'react-router-dom';
import { ICONS } from "@/shared/constants";
import { Button } from "@/shared/ui/Button";
import { DropdownButton } from "@/shared/ui/Button";
import { useAuthStore } from "@/entities/auth";
import { useProviderStore } from '@/entities/provider';

export const AppHeader = () => {
  const Logo = ICONS.Logo;
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, clearAuth } = useAuthStore();

  const isLoggedIn = !!userInfo;
  const isProvider = userInfo?.role === 'PROVIDER';
  const { selectedPlace, places } = useProviderStore();

  const isPlacePage = location.pathname.startsWith('/place');

  const handlePlaceSelect = (option: string) => {
    if (option === "추가하기") {
      // navigate('/place/add');
    } else {
      const target = places.find(p => p.placeName === option);
      if (target) navigate(`/place/${target.placeId}`);
    }
  };

  return (
    <header className="fixed hidden lg:block z-[9999] left-1/2 -translate-x-1/2 top-0 w-[724px] h-[64px] mt-[44px] mx-auto">
      <div className="flex items-center justify-between pl-9 p-4 py-3 h-full bg-gray-200/80 rounded-full backdrop-blur-[60px]">

        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="p-0 m-0 bg-transparent border-0 cursor-pointer">
            <Logo className="w-[48px] h-[34px]" />
          </button>

          {isLoggedIn && isProvider && (
            <DropdownButton
              className="w-[224px]"
              label={selectedPlace?.placeName ?? '가게 선택'}
              options={[...places.map(p => p.placeName), "추가하기"]}
              onSelect={handlePlaceSelect}
            />
          )}

          {isLoggedIn && !isProvider && (
            <span className="text-[16px] font-semibold">
              {userInfo.nickname}님, 안녕하세요!
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn && isProvider && isPlacePage && (
            <Button
              variant="inversePrimary"
              size="lPill"
              type="button"
            // onClick={() => navigate(`/place/${selectedPlace?.placeId}/edit`)}
            >
              편집하기
            </Button>
          )}

          {isLoggedIn && (
            <Button variant="plain" size="lPill" type="button">
              설정
            </Button>
          )}
          <Button
            variant={isLoggedIn ? "emphasize" : "primary"}
            size="lPill"
            type="button"
            onClick={() => {
              if (isLoggedIn) {
                clearAuth();
              } else {
                navigate('/login');
              }
            }}
          >
            {isLoggedIn ? "로그아웃" : "로그인"}
          </Button>
        </div>
      </div>
    </header>
  );
};
