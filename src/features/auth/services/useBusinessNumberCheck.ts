import { useState } from 'react';
import { request } from '@/shared/api/';
import type { ValidationStatus, BusinessVerifyResponse } from '../model/types';

export const useBusinessNumberCheck = () => {
  const [status, setStatus] = useState<ValidationStatus>('idle');

  const checkBusinessNumber = async (businessNumber: string) => {
    if (!businessNumber) return;

    setStatus('checking');

    try {
      const data = await request<BusinessVerifyResponse>(
        '/api/users/business/verify',
        'POST',
        { businessNumber }
      );

      if (data.valid) {
        setStatus('available');
      } else {
        setStatus('unavailable');
      }
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  return { status, checkBusinessNumber, setStatus };
};
