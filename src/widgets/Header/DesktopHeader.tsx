import { useNavigate } from 'react-router-dom';
import { ICONS } from "@/shared/constants";
import { Button } from "@/shared/ui/Button";
import { DropdownButton } from "@/shared/ui/Button";
import { useAuthStore } from "@/entities/auth";
import { useProviderStore } from '@/entities/provider';

export const DesktopHeader = () => {
  const Logo = ICONS.Logo;
  const navigate = useNavigate();
  const { userInfo, clearAuth } = useAuthStore();

  const isLoggedIn = !!userInfo;
  const isProvider = userInfo?.role === 'PROVIDER';
  const { selectedPlace, places } = useProviderStore();

  return (
    <header className="w-[724px] h-[64px] mt-[44px] mx-auto">
      <div className="flex items-center justify-between pl-9 p-4 py-3 h-full bg-gray-200/80 rounded-full backdrop-blur-[60px]">

        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="p-0 m-0 bg-transparent border-0 cursor-pointer">
            <Logo className="w-[48px] h-[34px]" />
          </button>

          {isLoggedIn && isProvider && (
            <DropdownButton
              className="w-[224px] h-[24px]"
              label={selectedPlace?.placeName ?? ''}
              options={places.map(p => p.placeName)}
            />
          )}

          {isLoggedIn && !isProvider && (
            <span className="text-[16px] font-semibold">
              {userInfo.nickname}님, 안녕하세요!
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn && isProvider && (
            <Button variant="inversePrimary" size="lPill" type="button">
              편집하기
            </Button>
            // 라우팅 넣어야함
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
