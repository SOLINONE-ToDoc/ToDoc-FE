import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from './ui/SignUpForm';
import { SignUpButton } from './ui/SignUpButton';
import {
  generateRandomNickname,
  useSignUpValidation,
  useEmailCheck,
  useSignUp,
  VALIDATION_MESSAGES
} from '@/features/auth';
import type { VisitorSignUpRequest } from '@/features/auth';

export const VisitorSignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<VisitorSignUpRequest>({
    userType: 'VISITOR',
    nickname: '신난 굴림체',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { status: emailStatus, checkEmail, resetStatus: resetEmailStatus } = useEmailCheck();
  const { errors: validationErrors, isValid: isFormValid } = useSignUpValidation(formData);
  const { signUp, isLoading } = useSignUp();

  const combinedErrors: Partial<Record<keyof VisitorSignUpRequest, string>> = {
    ...validationErrors,
    email:
      validationErrors.email ??
      (emailStatus === 'duplicated'
        ? VALIDATION_MESSAGES.EMAIL.DUPLICATED
        : emailStatus === 'available'
        ? VALIDATION_MESSAGES.EMAIL.AVAILABLE
        : undefined),
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
      <SignUpButton
        onClick={handleSignUp}
        disabled={!isFormValid || emailStatus !== 'available'}
        isLoading={isLoading}
      />
    </main>
  );
};
