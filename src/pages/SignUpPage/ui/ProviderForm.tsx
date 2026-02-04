import React from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ICONS } from '@/shared/constants';
import type { ProviderSignUpRequest, SignUpFormData, SignUpErrors } from '@/features/auth';

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
  errors?: SignUpErrors<ProviderSignUpRequest>;
}

export const ProviderForm: React.FC<SignUpFormProps> = ({
  formData,
  onChange,
  businessNumberButton,
  errors = {}
}) => {

  const providerData = formData as Extract<SignUpFormData, { userType: 'PROVIDER' }>;

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
              onChange={onChange}
              required
              className="flex-1"
              error={!!errors.businessNumber}
              helperText={errors?.businessNumber}
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
          <div className="flex w-full gap-2">
            <Input
                name="date"
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
              onClick={() => {/* 캘린더 넣기 */}}
            >
              {providerData.openedAt || (
                <span className="flex">
                  <span className="lg:hidden">선택</span>
                  <span className="hidden lg:inline">날짜 선택</span>
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:gap-3">
          <label className="text-[16px] lg:text-[18px] font-semibold">매장 추가</label>
          <Input
            name="placeName"
            type="search"
            placeholder="매장명을 입력해주세요"
            iconType="search"
            value={providerData.placeName}
            onChange={onChange}
            helperText="매장 추가는 회원가입 후 진행해도 괜찮아요"
            required
          />
        </div>
      </div>
    </form>
  );
};
