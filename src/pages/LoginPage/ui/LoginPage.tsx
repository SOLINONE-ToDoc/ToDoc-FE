import { useState } from 'react';
import type { LoginRequest } from '@/features/auth'
import { LoginForm } from './LoginForm';

export const LoginPage = () => {

  const [formData, setFormData] = useState<Pick<LoginRequest, 'email' | 'password'>>({
    email: '',
    password: '',
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (data: { email: string; password: string }) => {
    console.log('로그인 요청', data);
  };

  return (
     <main className="flex flex-col items-center px-5 w-full max-w-[750px] mx-auto min-h-screen pt-[168px]">
      <LoginForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </main>
  );
};
