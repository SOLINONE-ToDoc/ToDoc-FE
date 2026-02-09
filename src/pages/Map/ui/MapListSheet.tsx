import type { MapPlaceWithMessage } from '@/entities/map';
import { PLACE_TYPE_LABEL } from '@/entities/place';
import { getRelativeVisitText } from '@/shared/utils';

interface MapListSheetProps {
  places: MapPlaceWithMessage[];
  selectedPlaceId: number | null;
  onSelect: (placeId: number) => void;
}

export const MapListSheet = ({ places, onSelect }: MapListSheetProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5">
      <h2 className="text-heading-1 font-semibold mb-6">
      주변 매장
      </h2>
      {places.map((place) => (
        <div
          key={place.placeId}
          onClick={() => onSelect(place.placeId)}
        >
          <div className="flex flex-col justify-start gap-2">
            <div className="flex gap-4">
              <div className="w-[88px] h-[88px] rounded-[8px] bg-gray-200 shrink-0" />
              <div className="flex flex-col justify-start gap-2">
                <div className="text-heading-1 font-semibold">
                  {place.placeName}
                </div>
                <div className="flex gap-2">
                  <div className="text-caption font-semibold">
                    {PLACE_TYPE_LABEL[place.placeType]}
                  </div>
                  <div className="text-caption font-semibold">
                    {getRelativeVisitText(place.lastVisitedAt)}
                  </div>
                </div>
                <div className="text-caption font-regular text-gray-500">
                  {place.address}
                </div>
              </div>
              </div>
              {place.myContent && (
              <div className="flex gap-[10px] rounded-[4px] border border-gray-200 py-2 pl-3">
               <div className="text-caption font-medium text-red-400">
                내 기록
                </div>
                <div className="text-caption font-regular text-gray-600 truncate">
                  {place.myContent}
                </div>
              </div>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};
