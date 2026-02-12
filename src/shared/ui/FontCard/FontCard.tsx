import React, { useState } from 'react';
import { cn } from '@/shared/lib';

const BACK_GRADIENT = 'linear-gradient(154deg, #000000 0%, #3F3F3F 77%, #000000 100%)';

const SIZES = {
  sm: 'w-[168px] h-[228px]',
  md: 'w-[184px] h-[248px]',
  lg: 'w-[212px] h-[284px]',
  xl: 'w-[248px] h-[332px]',
};

interface FontCardProps {
  content: string;
  date: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bgImage?: string | null;
  fontFamily?: string;
  company: string;
  category: string;
  fontName: string;
}

export const FontCard: React.FC<FontCardProps> = ({
  content, date, size = 'md', bgImage, fontFamily, company, category, fontName,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn("perspective-1000 cursor-pointer", SIZES[size])}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={cn(
        "relative w-full h-full duration-700 preserve-3d transition-transform ease-in-out",
        isFlipped && "rotate-y-180"
      )}>

        <div className="absolute inset-0 backface-hidden shadow-lg overflow-hidden border border-gray-200 bg-white">
          <div
            className="flex flex-col justify-between w-full h-full p-6"
            style={{
              backgroundImage: bgImage ? `url(${bgImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              fontFamily: fontFamily
            }}
          >
            <div className="flex-1 flex items-center justify-center text-center">
              <p className={cn("break-words w-full", content.length < 10 ? "text-[32px] leading-tight" : "text-[18px]")}>
                {content.slice(0, 60)}
              </p>
            </div>
            <span className="text-[14px] font-medium text-center opacity-60">{date}</span>
          </div>
        </div>
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-between p-8 text-white shadow-2xl"
          style={{ background: BACK_GRADIENT }}
        >
          <div className="flex flex-col items-start">
            <span className="text-body-2 text-red-400 font-semibold tracking-wide">
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-body-1 text-white font-regular">
              {company} · {category}
            </span>

            <h3
              className="text-[24px] font-semibold leading-tight break-keep"
            >
              {fontName}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
