import { OnboardingCard } from '@/shared/ui/Card';
import { IMAGES } from '@/shared/constants/images';

export const HomeFeatureSection = () => {
  return (
    <section className="py-20 bg-gray-100 flex flex-col items-center py-[120px]">
      <div className="w-full flex flex-col items-center gap-4 lg:gap-10 text-center mb-[40px] lg:mb-[100px]">
        <div className="flex items-center">
          <span className="text-[18px] font-semibold text-red-400">
            토독, 토독 추억이 쌓이는 소리
          </span>
        </div>
        <div className="flex items-center text-center">
          <span
            className="
              text-[40px] lg:text-hero-2 font-bold
              leading-tight sm:leading-[1.05]
              whitespace-pre-line
            "
          >
            {`찰나의 머무름을 `}
            <br className="block sm:hidden" />
            영원한 추억으로.
          </span>
        </div>

        <div className="flex items-center text-center">
  <span className="text-[18px] font-semibold">
    작은 인사와 기억들이 쌓여 공간의 이야기가 됩니다.
    <br />
    <span className="hidden sm:inline">
      공연장, 카페, 전시회—어디서든, 토독과 함께 당신의 순간을 기록하세요.
    </span>

    {/* sm 전용 줄 쪼개기 */}
    <span className="inline sm:hidden">
      공연장, 카페, 전시회—어디서든,
      <br />
      토독과 함께 당신의 순간을 기록하세요.
    </span>
  </span>
</div>
      </div>

      <div className="
        grid grid-cols-1 md:grid-cols-2
        gap-8
        w-full
        lg:w-[1140px]
        md:w-[840px]
        mx-auto
        justify-items-center
      ">

        <OnboardingCard
          number="01"
          title="분위기에 알맞는 방명록"
          description=
          {`카페, 갤러리, 스튜디오 어디든,
          매장에 따라 다양한 테마를 선택해서 만들어요`}
          illustration={<IMAGES.Step1 />}
        />

        <OnboardingCard
          number="02"
          title="QR 스캔으로 손쉬운 방명록 작성"
          description={"복잡한 가입 없이 QR 스캔 한 번으로 방명록을 작성할 수 있어요"}
          illustration={<IMAGES.Step2 />}
          hoverIllustration={<IMAGES.Step2Hover />}
        />

        <OnboardingCard
          number="03"
          title="실제 방문 고객 기록"
          description={"리뷰가 아닌 실제 방문한 사람들의 생생한 목소리를 들을 수 있어요"}
          illustration={<IMAGES.Step3 />}
          hoverIllustration={<IMAGES.Step3Hover />}
        />

        <OnboardingCard
          number="04"
          title="주변 서비스 매장 안내"
          description={
            `내 기록이 쌓인 '토독' 매장들을 확인하고,
            가까운 거리의 새로운 스팟을 발견해보세요`}
          illustration={<IMAGES.Step4 />}
          hoverIllustration={<IMAGES.Step4Hover />}
        />

      </div>
    </section>
  );
};
