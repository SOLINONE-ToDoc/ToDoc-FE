import { useState } from 'react';
import { request } from '@/shared/api';
import { useAuthStore } from '@/entities/auth';
import type { LoginRequest, LoginResponse } from '../model/types';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      const result = await request<LoginResponse>('/api/users/login', 'POST', data);
      const { accessToken, expiresIn, ...userInfo } = result;
      setAuth(accessToken, userInfo, expiresIn);

    } catch (error) {
      const fixedMessage = '현재 접속자가 많아 처리가 지연되고 있습니다. 잠시 후 다시 시도해 주세요.';
      alert(fixedMessage);
      console.error('Login Error:', error);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};
