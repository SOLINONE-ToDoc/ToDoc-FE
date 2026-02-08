import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '@/shared/constants';

export const SignUpSuccessPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <main className="flex flex-col items-center justify-center gap-8 w-full max-w-[750px] mx-auto text-center min-h-[calc(100vh-108px)]">
      <ICONS.Check />
      <h1 className="text-title lg:text-[28px] font-semibold text-content-primary">
        회원가입 완료!
      </h1>
      <p className="text-body-1 lg:text-[18px] font-regular text-content-primary">
        다양한 폰트로<br />
        잊지 못할 추억을 남겨보아요!
      </p>
      <p className="text-caption lg:text-[14px] font-medium text-content-muted">
        {countdown}초 뒤 홈으로
      </p>
    </main>
  );
};
