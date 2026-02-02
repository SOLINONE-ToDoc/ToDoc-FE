import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserType } from '@/entities/user/model/types';
import type { LoginRequest } from '@/features/auth'
import { Button } from '@/shared/ui/Button';
import { LoginForm } from './ui/LoginForm';

export const LoginPage = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState<UserType>('VISITOR');

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

  const handleSignupNavigation = () => {
    const path = userType === 'VISITOR' ? '/signup/visitor' : '/signup/provider';
    navigate(path);
  };

  const handleSubmit = async () => {
    const finalRequest: LoginRequest = {
      ...formData,
      userType,
    };
    console.log('로그인 요청', finalRequest);
  };

  return (
     <main className="flex flex-col items-center px-5 w-full max-w-[750px] mx-auto min-h-screen pt-[168px]">
      <LoginForm
        formData={formData}
        onChange={handleChange}
        onSignupClick={handleSignupNavigation}
        onSubmit={handleSubmit}
      />

      <div className="flex items-center justify-center gap-2 mt-10">
        <Button
          variant="outline"
          size="pill"
          type="button" onClick={() => setUserType(prev => prev === 'VISITOR' ? 'PROVIDER' : 'VISITOR')}>
          {userType === 'VISITOR' ? '사장님이신가요?' : '일반회원이신가요?'}&nbsp;
          <span className="text-content-muted">여기를 눌러 로그인해주세요</span>
        </Button>
      </div>
    </main>
  );
};
