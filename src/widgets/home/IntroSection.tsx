import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { ICONS } from "@/shared/constants";
import { loadWebFont } from "@/entities/font/hooks/loadWebFont";

export const IntroSection = () => {
  const navigate = useNavigate();
  const linkHref = "[https://qns2c88qif.execute-api.ap-northeast-2.amazonaws.com/v1/api/css/drop_fontstream_css/?sid=gAAAAABpgEQse68YztzGZ_eK8S6TbFLggmoCHvUKY-KjX_w6d0UBXvaEOYMsoPuVHoriIc-syH0Wuyvqss8bLnJJejjr5sm-dED7bmR9XyiE6DXWde68d2qkhUhAf36kHDmBpiAqnvtAuUPWF_gBkFWf6yuUk2_lswQhdlS5dwXUpfU0jkT_H9fTauDXVjEFjUiceVde8t-tzPVMq31PB3sV77b4AZ8CnWGUEpmaTdsiv32mhrcClsxGxKgQFP7GYLEA3snTm1nL](https://qns2c88qif.execute-api.ap-northeast-2.amazonaws.com/v1/api/css/drop_fontstream_css/?sid=gAAAAABpgEQse68YztzGZ_eK8S6TbFLggmoCHvUKY-KjX_w6d0UBXvaEOYMsoPuVHoriIc-syH0Wuyvqss8bLnJJejjr5sm-dED7bmR9XyiE6DXWde68d2qkhUhAf36kHDmBpiAqnvtAuUPWF_gBkFWf6yuUk2_lswQhdlS5dwXUpfU0jkT_H9fTauDXVjEFjUiceVde8t-tzPVMq31PB3sV77b4AZ8CnWGUEpmaTdsiv32mhrcClsxGxKgQFP7GYLEA3snTm1nL";

  useEffect(() => {
    loadWebFont(linkHref)
      .then(() => console.log("success"))
      .catch((e) => console.log("error", e));
  }, []);

  return (
    <section className="flex flex-col items-center mt-[108px] py-[102px]">
      <div className="w-full flex flex-col items-center gap-4 lg:gap-10 text-center">
        <div className="flex flex-col gap-3 items-center">
          <span className="text-[18px] font-semibold text-gray-500" style={{ fontFamily: "'Sandoll Geobok'", fontWeight: 400}}>
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
          rightIcon={<ICONS.Down width={24} height={24} color="white" strokeWidth={2} className="-rotate-90" />}
          onClick={() => navigate('/login')}
        >
          무료로 방명록 만들기
        </Button>
      </div>
    </section>
  );
};
