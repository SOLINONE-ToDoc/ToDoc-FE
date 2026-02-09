import { request } from '@/shared/api';
import type { BrifContent } from '@/entities/board';

export const fetchMyPageContents = async (): Promise<BrifContent[]> => {
  const response = await request<BrifContent[]>(
    '/api/mypage/contents',
    'GET'
  );
  return response.data;
};
