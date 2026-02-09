import {
  HomeFeatureSection,
  IntroSection,
  ProblemSection,
} from '@/widgets/home';

export const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      <IntroSection />
      <ProblemSection />
      <HomeFeatureSection />
    </div>
  );
};
