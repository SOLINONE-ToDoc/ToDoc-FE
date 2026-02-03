import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <main className="flex flex-col items-center justify-center gap-8 w-full max-w-[750px] mx-auto min-h-screen text-center">
      <div
        className="
          absolute -z-10
          w-[300px] h-[300px] blur-[130px]
          lg:w-[460px] lg:h-[460px] lg:blur-[130px]
          rounded-full opacity-20 bg-brand-gradient
          animate-gentle-pulse
        "
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
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
