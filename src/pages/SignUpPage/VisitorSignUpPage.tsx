import React from 'react';
import { SignUpForm } from './ui/SignUpForm';
import { generateRandomNickname, useSignUpValidation, useEmailCheck, EMAIL_ERROR_MESSAGES } from '@/features/auth';
import type { VisitorSignUpRequest } from '@/features/auth';

export const VisitorSignUpPage = () => {
  const [formData, setFormData] = React.useState<VisitorSignUpRequest>({
    userType: 'VISITOR',
    nickname: '신난 굴림체',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { status: emailStatus, checkEmail, resetStatus: resetEmailStatus } = useEmailCheck();
  const { errors: validationErrors, } = useSignUpValidation(formData);

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

  return (
    <main className="flex flex-col items-center px-5 w-full max-w-[750px] mx-auto min-h-screen pt-[168px]">
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
    </main>
  );
};
