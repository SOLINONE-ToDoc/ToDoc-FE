import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from './ui/SignUpForm';
import { ProviderForm } from './ui/ProviderForm';
import { SignUpButton } from './ui/SignUpButton';
import {
  generateRandomNickname,
  useSignUpValidation,
  useBusinessNumberCheck,
  useEmailCheck,
  useSignUp,
  VALIDATION_MESSAGES
} from '@/features/auth';
import type { VisitorSignUpRequest, ProviderSignUpRequest, SignUpErrors } from '@/features/auth';
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
  const { status: businessStatus, checkBusinessNumber, setStatus: setBusinessStatus } = useBusinessNumberCheck();
  const { errors: validationErrors, isValid: isFormValid } = useSignUpValidation(formData);
  const { signUp, isLoading } = useSignUp();

  const combinedErrors: SignUpErrors<ProviderSignUpRequest> = {
    ...validationErrors,
    email:
      validationErrors.email ??
      (emailStatus === 'duplicated'
        ? VALIDATION_MESSAGES.EMAIL.DUPLICATED
        : emailStatus === 'available'
        ? VALIDATION_MESSAGES.EMAIL.AVAILABLE
        : undefined),
    businessNumber:
    validationErrors.businessNumber ??
    (businessStatus === 'unavailable'
      ? VALIDATION_MESSAGES.BUSINESS.INVALID_NUMBER
      : businessStatus === 'available'
      ? VALIDATION_MESSAGES.BUSINESS.AVAILABLE
      : undefined),
  };

  const commonErrors = combinedErrors as SignUpErrors<VisitorSignUpRequest>;

  const providerErrors = combinedErrors as SignUpErrors<ProviderSignUpRequest>;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email') resetEmailStatus();
    if (name === 'businessNumber') setBusinessStatus('idle');
  };

  const handleGenerateNickname = () => {
    const randomNickname = generateRandomNickname();
    setFormData(prev => ({ ...prev, nickname: randomNickname }));
  };

  const handleCheckDuplicate = () => {
    checkEmail(formData.email);
  };

  const handleCheckBusinessDuplicate = () => {
    const pureNumber = formData.businessNumber.replace(/-/g, '');
    checkBusinessNumber(pureNumber);
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
          errors={commonErrors}
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
          errors={providerErrors}
          businessNumberButton={{
            disabled: !formData.businessNumber || !!validationErrors.businessNumber || businessStatus === 'checking',
            isValid: businessStatus === 'available',
            onClick: handleCheckBusinessDuplicate,
          }}
          onDateSelect={(date: string) => {
            setFormData(prev => ({ ...prev, openedAt: date }));
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
