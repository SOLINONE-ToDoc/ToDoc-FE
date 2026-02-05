import React from 'react';
import { cn } from '@/shared/lib';

interface OnboardingCardProps {
  number: string;
  title: string;
  description: string;
  illustration: React.ReactNode;
  hoverIllustration?: React.ReactNode;
  className?: string;
}

export const OnboardingCard = ({
  number,
  title,
  description,
  illustration,
  hoverIllustration,
  className,
}: OnboardingCardProps) => {
  return (
    <div
      className={cn(
        'w-[400px] h-[432px] lg:w-[550px] lg:h-[700px]',
        'p-4 lg:p-5 bg-white rounded-[16px] lg:rounded-[20px]',
        'flex flex-col items-center justify-start',
        'transition-all duration-300 hover:bg-red-400 lg:hover:-rotate-[4deg] group',
        'gap-3 lg:gap-4',
        className
      )}
    >
    <div className="w-full flex flex-col items-center gap-3 lg:gap-4 text-center">
        <span className="text-[20px] lg:text-[32px] font-semibold text-gray-500 group-hover:text-white">
          {number}
        </span>

        <span className="text-[18px] lg:text-[28px] font-semibold group-hover:text-white">
          {title}
        </span>

        <span className="text-[14px] lg:text-[16px] text-gray-400 line-clamp-3 group-hover:text-white whitespace-pre-line">
          {description}
        </span>
      </div>

      <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden">
        <div className="w-[260px] h-[260px] lg:w-[500px] lg:h-[500px] relative">
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
              hoverIllustration && 'group-hover:opacity-0'
            )}
          >
            {illustration}
          </div>

          {hoverIllustration && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {hoverIllustration}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
