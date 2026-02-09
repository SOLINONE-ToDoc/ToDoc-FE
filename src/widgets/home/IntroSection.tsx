import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { ICONS } from "@/shared/constants";

export const IntroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center mt-[108px] py-[102px]">
      <div className="w-full flex flex-col items-center gap-4 lg:gap-10 text-center">
        <div className="flex flex-col gap-3 items-center">
          <span className="text-[18px] font-semibold text-gray-500">
            추억을 남기는 가장 쉬운 방명록
          </span>
          <span
            className="text-[40px] lg:text-hero-2 font-bold leading-tight sm:leading-[1.05] whitespace-pre-line">
            {`내 손안의 방명록, 토독 `}
          </span>
          <span className="text-[22px] font-regular">
            by Sandoll
          </span>
        </div>
        <Button
          variant="primary" size="lPill" type="button"
          rightIcon={<ICONS.Down width={24} height={24} color="white" strokeWidth={2} className="-rotate-90"/>}
          onClick={() => navigate('/login')}
          >
          무료로 방명록 만들기
        </Button>
      </div>
    </section>
  );
};
