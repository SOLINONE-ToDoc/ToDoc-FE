import { useState } from 'react';
import { request } from '@/shared/api';
import type {
  SignUpFormData,
  VisitorSignUpPayload,
  ProviderSignUpPayload,
  ProviderSignUpRequest,
} from '../model/types';

function isProviderSignUp(data: SignUpFormData): data is ProviderSignUpRequest {
  return 'businessNumber' in data;
}

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      if (isProviderSignUp(data)) {
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
      } else {
        const payload: VisitorSignUpPayload = {
          nickname: data.nickname,
          email: data.email,
          password: data.password,
        };

        await request<string>('/api/users/signup/visitor', 'POST', payload);
      }

      return true;
    } catch (error) {
      alert(error instanceof Error ? error.message : '회원가입에 실패했어요.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading };
};
