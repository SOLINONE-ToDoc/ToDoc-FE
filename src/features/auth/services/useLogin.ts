import { useState } from 'react';
import { request } from '@/shared/api';
import type { LoginRequest } from '../model/types';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      await request<string>('/api/users/login', 'POST', data);
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

  return { login, isLoading };
};
