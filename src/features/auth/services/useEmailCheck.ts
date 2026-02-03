import { useState } from 'react';
import type { EmailDuplicateStatus } from '../model/types';

type EmailCheckError = 'NETWORK' | 'UNKNOWN' | null;

export const useEmailCheck = () => {
  const [status, setStatus] = useState<EmailDuplicateStatus>('idle');
  const [error, setError] = useState<EmailCheckError>(null);

  const checkEmail = async (email: string) => {
    if (!email) return;

    setStatus('checking');
    setError(null);

    try {
      // const res = await api.checkEmail(email);
      // const isDuplicated = res.duplicated;

      const isDuplicated = false;

      setStatus(isDuplicated ? 'duplicated' : 'available');
    } catch {
      setStatus('idle');
      setError('NETWORK');
    }
  };

  const resetStatus = () => {
    setStatus('idle');
    setError(null);
  };

  return {
    status,
    error,       // ❗ 메시지 아님
    checkEmail,
    resetStatus,
  };
};
