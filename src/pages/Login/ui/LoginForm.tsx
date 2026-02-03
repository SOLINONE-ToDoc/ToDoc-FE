import React from 'react';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

type LoginFormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  formData: LoginFormData;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: (formData: LoginFormData) => void;
  onSignupClick: () => void;
  isLoading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ formData, onChange, onSignupClick, onSubmit }) => {
  return (
    <form className="flex flex-col w-full" noValidate onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
      <div className="flex flex-col gap-2 lg:gap-8">
        <Input
          label="이메일 아이디"
          labelClassName="text-[24px] hidden lg:block"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          value={formData.email}
          onChange={onChange}
          required
        />

        <div className="flex flex-col gap-2 lg:gap-3">
          <Input
            label="비밀번호"
            labelClassName="text-[24px] hidden lg:block"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            iconType="passwordToggle"
            value={formData.password}
            onChange={onChange}
            required
          />
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="text"
              size="text"
              onClick={() => console.log('아이디 찾기')}
              >
              아이디 찾기
            </Button>

            <Button
              type="button"
              variant="text"
              size="text"
              onClick={() => console.log('비밀번호 찾기')}
              >
              비밀번호 찾기
            </Button>

            <Button
              type="button"
              variant="text"
              size="text"
              onClick={onSignupClick}
              >
              회원가입
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 lg:gap-4 mt-8 lg:mt-20">
        <Button
          type="submit"
          variant="primary"
          size="xl"
          fullWidth
          >
          로그인
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="xl"
          fullWidth
        >
          비회원으로 작성하기
        </Button>
      </div>
    </form>
  );
};
