import React from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ICONS } from '@/shared/constants';
import type { ProviderSignUpRequest, SignUpFormData, SignUpErrors } from '@/features/auth';
import { formatBusinessNumber, formatDateToYYYYMMDD } from '@/shared/utils';
import { getConfirmStatus } from '@/shared/lib';
import { Calendar } from '@/shared/ui/Calendar';
import { PlaceResultList } from '@/shared/ui/Map';
import type { KakaoPlaceWithZonecode } from '@/shared/types';

interface BusinessNumberButtonProps {
  disabled: boolean;
  isValid: boolean;
  onClick: () => void;
}

interface SignUpFormProps {
  formData: SignUpFormData;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onGenerateNickname: () => void;
  businessNumberButton: BusinessNumberButtonProps;
  onDateSelect?: (date: string) => void;
  searchResults: KakaoPlaceWithZonecode[];
  onPlaceSelect: (place: KakaoPlaceWithZonecode) => void;
  onPlaceSearch: () => void;
  isPlaceSearching: boolean;
  errors?: SignUpErrors<ProviderSignUpRequest>;
}

export const ProviderForm: React.FC<SignUpFormProps> = ({
  formData,
  onChange,
  businessNumberButton,
  onDateSelect,
  searchResults,
  onPlaceSelect,
  onPlaceSearch,
  isPlaceSearching,
  errors = {}
}) => {

  const providerData = formData as Extract<SignUpFormData, { userType: 'PROVIDER' }>;

  const handleBusinessNumberChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  const formatted = formatBusinessNumber(e.target.value);
    e.target.value = formatted;
    onChange(e);
  };

  const [isCalendarOpen, setCalendarOpen] = React.useState(false);

  return (
    <form className="flex flex-col w-full" noValidate>
      <div className="flex flex-col gap-10 lg:gap-[68px]">
        <div className="flex flex-col gap-3">
          <label className="text-[16px] lg:text-[18px] font-semibold">사업자 등록번호*</label>
          <div className="flex w-full gap-2">
            <Input
              name="businessNumber"
              type="text"
              placeholder="000-00-00000"
              value={providerData.businessNumber}
              onChange={handleBusinessNumberChange}
              required
              className="flex-1"
              helperStatus={getConfirmStatus(
                providerData.businessNumber,
                errors?.businessNumber,
                businessNumberButton?.isValid
              )}
              helperText={errors.businessNumber}
            />

            <Button
              type="button"
              size="input"
              variant={businessNumberButton?.isValid ? 'primary' : 'disabled'}
              disabled={businessNumberButton?.disabled ?? true}
              onClick={businessNumberButton?.onClick}
            >
              중복확인
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-[16px] lg:text-[18px] font-semibold">개업 연월일*</label>
          <div className="relative flex w-full gap-2">
            <Input
                name="openedAt"
                type="text"
                placeholder="0000.00.00"
                value={providerData.openedAt}
                onChange={onChange}
                required
                className="flex-1"
                readOnly
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
                value={providerData.openedAt}
                onSelect={(date) => {
                  const formatted = formatDateToYYYYMMDD(date);
                  onDateSelect?.(formatted);
                }}
                onClose={() => setCalendarOpen(false)}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:gap-3">
          <label className="text-[16px] lg:text-[18px] font-semibold">매장 추가</label>
          <Input
            name="placeName"
            type="text"
            placeholder="매장명을 입력해주세요"
            iconType="search"
            value={providerData.placeName}
            onChange={onChange}
            onIconClick={onPlaceSearch}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onPlaceSearch())}
            disabled={isPlaceSearching}
            helperText="매장 추가는 회원가입 후 진행해도 괜찮아요"
          />

          {searchResults.length > 0 && (
          <PlaceResultList
            results={searchResults}
            onSelect={onPlaceSelect}
            className="pt-4"
          />
        )}
        </div>
      </div>
    </form>
  );
};
