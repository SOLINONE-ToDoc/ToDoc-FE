import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { ICONS } from '@/shared/constants';
import { Calendar } from '@/shared/ui/Calendar';
import { PlaceResultList } from '@/shared/ui/Map';
import { AddButton } from './ui/AddButton';
import { useRegisterPlace } from '@/features/place';
import { useKakaoPlaceSearch, useKakaoZipcode } from '@/shared/hooks';
import { mapKakaoCategoryToPlaceType } from '@/entities/place';
import { getTodayFormatted, formatBusinessNumber, formatDateToYYYYMMDD } from '@/shared/utils';
import type { KakaoPlaceWithZonecode } from '@/shared/types';
import type { RegisterPlacePayload } from '@/features/place/model/types';
import { useProviderStore } from '@/entities/provider';

export const PlaceAddPage = () => {
  const navigate = useNavigate();
  const todayStr = React.useMemo(() => getTodayFormatted(), []);
  const { registerPlace, isLoading } = useRegisterPlace();

  const [formData, setFormData] = React.useState<RegisterPlacePayload>({
    placeName: '',
    address: '',
    latitude: 0.1,
    longitude: 0.1,
    zoneCode: '',
    businessNumber: '',
    openedAt: '',
    placeType: 'OTHER',
  });

  const [isCalendarOpen, setCalendarOpen] = React.useState(false);
  const { search, results, reset: resetPlaceSearch, isLoading: isPlaceSearching } = useKakaoPlaceSearch();
  const { getZipcode } = useKakaoZipcode();
  const [enrichedPlaceResults, setEnrichedPlaceResults] = React.useState<KakaoPlaceWithZonecode[]>([]);

  React.useEffect(() => {
    const enrichResults = async () => {
      if (results.length > 0) {
        const enriched = await Promise.all(
          results.map(async (place) => {
            try {
              const zonecode = await getZipcode(Number(place.x), Number(place.y));
              return { ...place, zonecode };
            } catch {
              return { ...place, zonecode: '' };
            }
          })
        );
        setEnrichedPlaceResults(enriched);
      } else {
        setEnrichedPlaceResults([]);
      }
    };
    enrichResults();
  }, [results, getZipcode]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const finalValue = name === 'businessNumber' ? formatBusinessNumber(value) : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handlePlaceSearch = () => {
    if (!formData.placeName.trim()) return;
    search(formData.placeName);
  };

  const handlePlaceSelect = (place: KakaoPlaceWithZonecode) => {
    const mappedPlaceType = mapKakaoCategoryToPlaceType(place.category_group_code);
    setFormData(prev => ({
      ...prev,
      placeName: place.place_name,
      address: place.road_address_name || place.address_name,
      latitude: Number(place.y),
      longitude: Number(place.x),
      zoneCode: place.zonecode,
      placeType: mappedPlaceType,
    }));
    resetPlaceSearch();
  };

  const handleAddPlace = async () => {
    const success = await registerPlace(formData);

    if (success) {
      const { fetchPlaces } = useProviderStore.getState();
      await fetchPlaces();

      const latestPlaces = useProviderStore.getState().places;

      const newPlace = latestPlaces.find(p => p.placeName === formData.placeName);
      const targetPlaceId = newPlace?.placeId;

      if (targetPlaceId) {
        navigate(`/place/${targetPlaceId}`, { replace: true });
      } else {
        const firstId = latestPlaces[0]?.placeId;
        navigate(firstId ? `/place/${firstId}` : '/', { replace: true });
      }
    }
  };

  return (
    <main className="flex flex-col items-center px-5 lg:px-0 gap-[64px] lg:gap-[100px] w-full max-w-[760px] mx-auto min-h-screen py-[140px] lg:pb-[200px] lg:pt-[248px]">
      <div className="flex flex-col w-full gap-10 lg:gap-[68px]">

        <div className="flex flex-col gap-2 lg:gap-3">
          <label className="text-[16px] lg:text-[18px] font-semibold">매장 추가*</label>
          <Input
            name="placeName"
            type="text"
            placeholder="매장명을 입력해주세요"
            iconType="search"
            value={formData.placeName}
            onChange={handleChange}
            onIconClick={handlePlaceSearch}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handlePlaceSearch())}
            disabled={isPlaceSearching}
          />
          {enrichedPlaceResults.length > 0 && (
            <PlaceResultList
              results={enrichedPlaceResults}
              onSelect={handlePlaceSelect}
              className="pt-4"
            />
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-[16px] lg:text-[18px] font-semibold">사업자 등록번호*</label>
          <Input
            name="businessNumber"
            type="text"
            placeholder="000-00-00000"
            value={formData.businessNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-[16px] lg:text-[18px] font-semibold">개업 연월일*</label>
          <div className="relative flex w-full gap-2">
            <Input
              name="openedAt"
              type="text"
              placeholder={todayStr}
              value={formData.openedAt}
              onChange={handleChange}
              readOnly
              className="flex-1"
            />
            <Button
              type="button"
              size="input"
              variant="ghost"
              leftIcon={<ICONS.Calender />}
              onClick={() => setCalendarOpen(true)}
            >
              <span className="flex">
                <span className="lg:hidden">선택</span>
                <span className="hidden lg:inline">날짜 선택</span>
              </span>
            </Button>
            {isCalendarOpen && (
              <Calendar
                value={formData.openedAt}
                onSelect={(date) => {
                  const formatted = formatDateToYYYYMMDD(date);
                  setFormData(prev => ({ ...prev, openedAt: formatted }));
                  setCalendarOpen(false);
                }}
                onClose={() => setCalendarOpen(false)}
              />
            )}
          </div>
        </div>
      </div>

      <AddButton
        onClick={handleAddPlace}
        disabled={!formData.placeName || !formData.businessNumber || isLoading}
        isLoading={isLoading}
      />
    </main>
  );
};
