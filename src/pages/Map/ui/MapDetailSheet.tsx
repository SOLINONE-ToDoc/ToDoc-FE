import type { MapPlaceWithMessage } from '@/entities/map';
import { PLACE_TYPE_LABEL } from '@/entities/place';
import { getRelativeVisitText } from '@/shared/utils';
import { usePlaceLatestContent } from '@/features/map';
import { usePlaceMyContents } from '@/features/map';
import { NotesRow } from '@/widgets/Note';
import { ThreeNotes } from '@/widgets/Note';
import { useFontPreload } from '@/shared/hooks';

interface MapDetailSheetProps {
  places: MapPlaceWithMessage[];
  selectedPlaceId: number | null;
}

export const MapDetailSheet = ({ places, selectedPlaceId }: MapDetailSheetProps) => {
  const place = places.find((p) => p.placeId === selectedPlaceId);

  const { data: myContents } = usePlaceMyContents(selectedPlaceId);
  const { latestContents } = usePlaceLatestContent(selectedPlaceId);

  const myFontIds = myContents.map(c => c.fontId);
  const latestFontIds = latestContents.map(c => c.fontId);

  useFontPreload([...myFontIds, ...latestFontIds]);

  if (!place) return null;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col justify-start gap-5">
        <div className="flex gap-4 px-5 pt-5">
          <div className="w-[88px] h-[88px] rounded-[8px] bg-gray-200 shrink-0" />
          <div className="flex flex-col justify-start gap-2">
            <div className="text-heading-1 font-semibold">{place.placeName}</div>
            <div className="flex gap-2">
              <div className="text-caption font-semibold">{PLACE_TYPE_LABEL[place.placeType]}</div>
              <div className="text-caption font-semibold">{getRelativeVisitText(place.lastVisitedAt)}</div>
            </div>
            <div className="text-caption font-regular text-gray-500">{place.address}</div>
          </div>
        </div>
        <div className="flex flex-col px-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="text-body-1 font-semibold">이 가게의 방명록</div>
            <div className="text-caption font-regular text-gray-400">무작위로 2개만 추천되어 나타납니다</div>
          </div>
          <ThreeNotes contents={latestContents} />
        </div>
        <div className="flex flex-col gap-3 pl-5 mt-4">
          <div className="flex items-center gap-2 ">
            <div className="text-body-1 font-semibold">내 방명록</div>
            <div className="text-caption font-regular text-gray-400">{myContents.length}</div>
          </div >
          <NotesRow contents={myContents} />
        </div>
      </div>
    </div>
  );
};
