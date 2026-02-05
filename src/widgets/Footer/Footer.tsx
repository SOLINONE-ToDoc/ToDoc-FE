import React from 'react';
import { cn } from '@/shared/lib';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <div className="hidden lg:block">
    <footer className={cn(
      'flex justify-start items-center w-full h-[280px] bg-surface-tertiary select-none',
      className
    )}>
      <div className="flex flex-col gap-5 pl-[156px]">
        <div className="flex flex-col gap-2">
          <div className="flex gap-5">
            <span className="text-[14px] text-white">
              주식회사 산돌
            </span>
            <span className="text-[14px] text-white">
              대표이사 윤영호
            </span>
            <span className="text-[14px] text-white">
              사업자등록번호 582-88-01149
            </span>
            <span className="text-[14px] text-white">
              통신판매신고번호 2021-서울성동-01902
            </span>
          </div>
          <div className="flex gap-3">
            <span className="text-[14px] text-white">
              서울특별시 성동구 아차산로 17길 49
            </span>
            <span className="text-[14px] text-white">
              성수생각공장 6층
            </span>
          </div>
          <div className="flex gap-3">
            <span className="text-[14px] text-white">
              Copyright © Sandoll Inc. All Rights Reserved.
            </span>
          </div>
        </div>
        <div className="flex">
          <span className="flex items-center justify-center text-[14px] font-medium border border-white px-3 py-1 rounded-full text-white">
            SoL in One Design System
          </span>
        </div>
      </div>
    </footer>
    </div>
  );
};
