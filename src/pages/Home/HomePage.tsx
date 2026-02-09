import { HomeFeatureSection, IntroSection } from '@/widgets/home';

export const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      <IntroSection />
      <HomeFeatureSection />
    </div>
  );
};
