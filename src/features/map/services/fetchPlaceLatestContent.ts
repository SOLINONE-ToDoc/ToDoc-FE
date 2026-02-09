import { request } from '@/shared/api';
import type { BrifContent } from '@/entities/board';

export const fetchLatestPlaceContent = async (placeId: number): Promise<BrifContent[]> => {
  const response = await request<BrifContent[]>(
    `/api/map/places/${placeId}/contents/random`,
    'GET'
  );
  return response.data;
};
