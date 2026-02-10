import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserType } from '@/entities/auth';
import { useLogin, type LoginRequest } from '@/features/auth'
import { Button } from '@/shared/ui/Button';
import { LoginForm } from './ui/LoginForm';
import { LoginHeader } from './ui/LoginHeader';
import { useAuthStore } from '@/entities/auth';
import { useProviderStore } from '@/entities/provider';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();

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
    const finalRequest: LoginRequest = { ...formData };

    const success = await login(finalRequest);
    if (!success) return;

    const { userInfo } = useAuthStore.getState();
    if (userInfo?.role === 'PROVIDER') {
      const { fetchPlaces } = useProviderStore.getState();
      await fetchPlaces();
      const updatedPlaces = useProviderStore.getState().places;

      if (updatedPlaces && updatedPlaces.length > 0) {

        const firstPid = updatedPlaces[0].placeId;
        navigate(`/place/${firstPid}`);
      } else {
        navigate('/place');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <main className="flex flex-col items-center px-5 lg:px-0 w-full max-w-[760px] mx-auto min-h-screen justify-center pt-0 lg:pb-[200px] lg:pt-[188px]">
      <LoginHeader />
      <LoginForm
        formData={formData}
        onChange={handleChange}
        onSignupClick={handleSignupNavigation}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <div className="flex items-center justify-center mt-10">
        <Button
          variant="outline"
          size="pill"
          type="button" onClick={() => setUserType(prev => prev === 'VISITOR' ? 'PROVIDER' : 'VISITOR')}>
          {userType === 'VISITOR' ? '사장님이신가요?' : '일반회원이신가요?'}
          <span className="text-content-muted">여기를 눌러 로그인해주세요</span>
        </Button>
      </div>
    </main>
  );
};
