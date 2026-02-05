import { useState } from 'react';
import { request } from '@/shared/api';
import type { SignUpFormData, VisitorSignUpPayload, ProviderSignUpPayload } from '../model/types';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      if (data.userType === 'PROVIDER') {
        const payload: ProviderSignUpPayload = {
          name: data.name,
          nickname: data.nickname,
          email: data.email,
          password: data.password,
          businessNumber: data.businessNumber,
          placeName: data.placeName,
          address: data.address,
          openedAt: data.openedAt,
          placeType: data.placeType,
          latitude: data.latitude,
          longitude: data.longitude,
          zoneCode: data.zoneCode,
        };

        await request<string>('/api/users/signup/provider', 'POST', payload);
      }

      else {
        const payload: VisitorSignUpPayload = {
          nickname: data.nickname,
          email: data.email,
          password: data.password,
        };

        await request<string>('/api/users/signup/visitor', 'POST', payload);
      }

      return true;

    } catch (error) {
      let errorMessage = '현재 접속자가 많아 처리가 지연되고 있습니다. 잠시 후 다시 시도해 주세요.';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      }
      alert(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading };
};
