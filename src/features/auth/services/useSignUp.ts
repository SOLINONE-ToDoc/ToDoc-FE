import { useState } from 'react';
import { request } from '@/shared/api';
import type { SignUpFormData, VisitorSignUpPayload, ProviderSignUpPayload, ProviderSignUpRequest } from '../model/types';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      if (data.userType === 'PROVIDER') {
        const provider = data as ProviderSignUpRequest;

        const payload: ProviderSignUpPayload = {
          name: provider.name,
          nickname: provider.nickname,
          email: provider.email,
          password: provider.password,
          businessNumber: provider.businessNumber,
          placeName: provider.placeName,
          address: provider.address,
          openedAt: provider.openedAt,
          placeType: provider.placeType,
          latitude: provider.latitude,
          longitude: provider.longitude,
          zoneCode: provider.zoneCode,
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

