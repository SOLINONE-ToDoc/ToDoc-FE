import React from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import type { SignUpFormData, SignUpErrors } from '@/features/auth';

interface EmailButtonProps {
  disabled: boolean;
  isValid: boolean;
  onClick: () => void;
}

interface SignUpFormProps {
  formData: SignUpFormData;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onGenerateNickname: () => void;
  emailButton?: EmailButtonProps;
  errors?: SignUpErrors;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  formData,
  onChange,
  onGenerateNickname,
  emailButton,
  errors = {}
}) => {
  return (
    <form className="flex flex-col w-full" noValidate>
      <div className="flex flex-col gap-10 lg:gap-[68px]">
        <Input
          label="닉네임"
          labelClassName="lg:text-[18px]"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={formData.nickname}
          onChange={onChange}
          iconType="refresh"
          onIconClick={onGenerateNickname}
          readOnly
        />

        <div className="flex flex-col gap-3">
          <label className="text-[16px] lg:text-[18px] font-semibold">이메일 아이디*</label>
          <div className="flex w-full gap-2">
            <Input
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={formData.email}
              onChange={onChange}
              required
              className="flex-1"
              error={!!errors.email}
              helperText={errors?.email}
            />

            <Button
            size="input"
            variant={emailButton?.isValid ? 'primary' : 'disabled'}
            disabled={emailButton?.disabled ?? true}
            onClick={emailButton?.onClick}
            >
            중복확인
          </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:gap-3">
          <Input
          label="비밀번호*"
          labelClassName="lg:text-[18px]"
          name="password"
          type="text"
          placeholder="비밀번호를 입력해주세요"
          value={formData.password}
          onChange={onChange}
          required
          />
          <Input
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호를 확인해주세요"
            iconType="passwordToggle"
            value={formData.passwordConfirm}
            onChange={onChange}
            error={!!errors.passwordConfirm}
            helperText={errors?.passwordConfirm}
            required
          />
        </div>
      </div>
    </form>
  );
};
