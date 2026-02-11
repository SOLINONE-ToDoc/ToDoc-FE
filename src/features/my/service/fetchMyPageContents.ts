import { request } from '@/shared/api';
import type { BrifContent } from '@/entities/board';

interface BrifContentResponse {
  contentId: number;
  content: string;
  theme_url: string;
  fontId: number;
  createdAt: string;
  placeId: number;
  placeName: string;
}

export const fetchMyPageContents = async (): Promise<BrifContent[]> => {
  const response = await request<BrifContentResponse[]>(
    '/api/mypage/contents',
    'GET'
  );
  return response.data.map((item) => ({
    contentId: item.contentId,
    content: item.content,
    themeUrl: item.theme_url,
    fontId: item.fontId,
    createdAt: item.createdAt,
    placeId: item.placeId,
    placeName: item.placeName,
  }));
};
