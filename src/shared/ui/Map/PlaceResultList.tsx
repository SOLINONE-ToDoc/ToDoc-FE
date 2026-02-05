import React from 'react';
import { Button } from '@/shared/ui/Button';
import { cn } from '@/shared/lib';
import type { KakaoPlaceWithZonecode } from '@/shared/types';

interface PlaceResultListProps {
  results: KakaoPlaceWithZonecode[];
  onSelect: (place: KakaoPlaceWithZonecode) => void;
  className?: string;
}

export const PlaceResultList: React.FC<PlaceResultListProps> = ({
  results,
  onSelect,
  className,
}) => {
  if (!results.length) return null;

  return (
    <div
      className={cn(
        'w-full bg-white border border-line-default rounded-[8px] p-6 gap-5',
        className
      )}
    >
      <div className="text-caption lg:text-[16px] font-semibold pb-6">
        검색결과 <span className="text-content-secondary">{results.length}</span>
      </div>

      <ul
        className="overflow-y-auto gap-5"
        style={{ maxHeight: '180px' }}
      >
        {results.map((place, index) => (
          <li key={place.id}>
            <div className="text-body-1 lg:text-[18px] font-semibold pb-3">
              {place.place_name}
            </div>

            <div className="flex justify-between items-end gap-3">
              <div className="flex flex-col gap-2 text-caption">
                <div className="flex items-center">
                  <span className="text-body-2 lg:text-[16px] font-semibold">
                    {place.zonecode}
                  </span>
                </div>

                {place.road_address_name && (
                  <div className="flex items-start gap-2 text-caption lg:text-[14px]">
                    <span className="font-semibold">도로명</span>
                    <span className="font-regular">
                      {place.road_address_name}
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-2 text-caption lg:text-[14px]">
                  <span className="font-semibold">구주소</span>
                  <span className="font-regular">
                    {place.address_name}
                  </span>
                </div>
              </div>

              <div className="mb-0">
                <Button
                  type="button"
                  size="sPill"
                  variant="emphasize"
                  onClick={() => onSelect(place)}
                >
                  선택하기
                </Button>
              </div>
            </div>

            {index !== results.length - 1 && (
              <div className="border-t border-line-default my-5" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
