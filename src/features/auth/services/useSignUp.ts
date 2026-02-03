import { useState } from 'react';
import { request } from '@/shared/api';
import type { VisitorSignUpRequest } from '../model/types';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (data: VisitorSignUpRequest) => {
    setIsLoading(true);
    try {
      const payload = {
        nickname: data.nickname,
        email: data.email,
        password: data.password,
      };

      await request<string>('/api/users/signup/visitor', 'POST', payload);
      return true;

    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : '현재 접속자가 많아 처리가 지연되고 있습니다. 잠시 후 다시 시도해 주세요.';

      alert(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading };
};
