import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from './ui/SignUpForm';
import { ProviderForm } from './ui/ProviderForm';
import { SignUpButton } from './ui/SignUpButton';
import {
  generateRandomNickname,
  useSignUpValidation,
  useEmailCheck,
  useSignUp,
  EMAIL_ERROR_MESSAGES
} from '@/features/auth';
import type { ProviderSignUpRequest } from '@/features/auth';
import { Input } from '@/shared/ui/Input';

export const ProviderSignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<ProviderSignUpRequest>({
    userType: 'PROVIDER',
    name:'',
    nickname: '신난 굴림체',
    email: '',
    password: '',
    passwordConfirm: '',
    businessNumber: '',
    openedAt: '',
    placeName: '',
    address: '',
    placeType: 'RESTAURANT',
    latitude: 0.1,
    longitude: 0.1,
  });

  const { status: emailStatus, checkEmail, resetStatus: resetEmailStatus } = useEmailCheck();
  const { errors: validationErrors, isValid: isFormValid } = useSignUpValidation(formData);
  const { signUp, isLoading } = useSignUp();

  const combinedErrors = {
    ...validationErrors,
    email: validationErrors.email || (emailStatus === 'duplicated' ? EMAIL_ERROR_MESSAGES.DUPLICATED : undefined)
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email') resetEmailStatus();
  };

  const handleGenerateNickname = () => {
    const randomNickname = generateRandomNickname();
    setFormData(prev => ({ ...prev, nickname: randomNickname }));
  };

  const handleCheckDuplicate = () => {
    checkEmail(formData.email);
  };

  const handleSignUp = async () => {
    if (!isFormValid || emailStatus !== 'available') return;

    const success = await signUp(formData);

    if (success) {
      navigate('/signup/success', { replace: true });
    }
  };

  return (
    <main className="flex flex-col items-center px-5 gap-[64px] lg:gap-[100px] w-full max-w-[750px] mx-auto min-h-screen pt-[168px]">
      <div className="flex flex-col w-full gap-10 lg:gap-[68px]">
        <Input
          label="이름"
          labelClassName="lg:text-[18px]"
          name="name"
          type="text"
          placeholder="이름을 입력해주세요"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <SignUpForm
          formData={formData}
          onChange={handleChange}
          onGenerateNickname={handleGenerateNickname}
          errors={combinedErrors}
          emailButton={{
            disabled: !formData.email || !!validationErrors.email || emailStatus === 'checking',
            isValid: emailStatus === 'available',
            onClick: handleCheckDuplicate,
          }}
        />
        <ProviderForm
          formData={formData}
          onChange={handleChange}
          onGenerateNickname={handleGenerateNickname}
          errors={combinedErrors}
          businessNumberButton={{
            disabled: !formData.businessNumber,
            isValid: false,
            onClick: () => {
              console.log('사업자 중복 확인 클릭');
            },
          }}
        />

        <div className="mt-5 w-full">
          <SignUpButton
            onClick={handleSignUp}
            disabled={!isFormValid || emailStatus !== 'available'}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
};
