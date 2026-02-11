import { request } from '@/shared/api';
import type { AiFontRecommendResponse } from '../model/types';

export const fetchAiFontRecommend = async (
  content: string,
  boardId: number
): Promise<AiFontRecommendResponse | null> => {
  try {
    const res = await request<AiFontRecommendResponse>(
      '/api/fonts/recommend/auto',
      'POST',
      { content, boardId }
    );

    return res.data;
  } catch (err) {
    console.error('AI 폰트 추천 실패:', err);
    return null;
  }
};
