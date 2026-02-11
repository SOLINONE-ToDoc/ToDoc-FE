import { useState } from 'react';
import { request } from '@/shared/api';
import type { RegisterPlacePayload } from '../model/types';

export const useRegisterPlace = () => {
  const [isLoading, setIsLoading] = useState(false);

  const registerPlace = async (data: RegisterPlacePayload): Promise<boolean> => {
    setIsLoading(true);
    try {
      await request<{ message: string }>('/api/place/register', 'POST', data);
      return true;
    } catch (err) {
      alert(err instanceof Error ? err.message : '가게 등록에 실패했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { registerPlace, isLoading };
};
