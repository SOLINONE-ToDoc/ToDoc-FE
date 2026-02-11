import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin, type LoginRequest } from '@/features/auth'
import { Button } from '@/shared/ui/Button';
import { LoginForm } from './ui/LoginForm';
import { LoginHeader } from './ui/LoginHeader';
import { useAuthStore } from '@/entities/auth';
import { usePlaceStore } from '@/entities/place';

type SignupUserType = 'VISITOR' | 'PROVIDER';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();

  const [userType, setUserType] = useState<SignupUserType>('VISITOR');

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
    if (userType === 'VISITOR') {
      navigate('/signup/visitor');
    } else {
      navigate('/signup/provider');
    }
  };

  const handleSubmit = async () => {
    const success = await login(formData);
    if (!success) return;

    const { userInfo } = useAuthStore.getState();

    if (!userInfo) {
      console.error('로그인 했는데 정보 없는 경우');
      return;
    }

    let targetPlaceId: number | null = null;

    if (userInfo.role === 'PROVIDER') {
      if (userInfo.placeIds.length > 0) {
        targetPlaceId = userInfo.placeIds[0];
      }
    } else {
      targetPlaceId = usePlaceStore.getState().lastSelectedPlaceId;
    }

    if (targetPlaceId !== null) {
      navigate(`/place/${targetPlaceId}`, { replace: true });
    } else {
      // navigate('/place/add', { replace: true });
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
