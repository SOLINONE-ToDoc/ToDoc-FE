import { useState } from 'react';
import { request } from '@/shared/api/';
import type { ValidationStatus } from '../model/types';

type EmailCheckError = 'NETWORK' | 'UNKNOWN' | null;

export const useEmailCheck = () => {
  const [status, setStatus] = useState<ValidationStatus>('idle');
  const [error, setError] = useState<EmailCheckError>(null);

  const checkEmail = async (email: string) => {
    if (!email) return;

    setStatus('checking');
    setError(null);

    try {
      await request<null>('/api/users/email/check', 'POST', { email });

      setStatus('available');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '';

      if (/이미|사용|가입|중복/.test(errorMessage)) {
        setStatus('duplicated');
      } else {
        setStatus('idle');
        setError('UNKNOWN');
      }
    }
  };

  const resetStatus = () => {
    setStatus('idle');
    setError(null);
  };

  return {
    status,
    error,
    checkEmail,
    resetStatus,
  };
};
