import { request } from '@/shared/api';
import type { FontRecommend } from '../model/types';

interface FontRecommendData {
  fonts: FontRecommend[];
}

export const fetchAiFontRecommend = async (content: string): Promise<FontRecommend[]> => {
  const res = await request<FontRecommendData>(
    '/api/fonts/recommend/auto',
    'POST',
    { content }
  );
  return res.data.fonts || [];
};
