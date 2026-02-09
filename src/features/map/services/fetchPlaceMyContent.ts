import { request } from '@/shared/api';
import type { BrifContent } from '@/entities/board';

export const fetchPlaceMyContent = async (placeId: number): Promise<BrifContent[]> => {
  const response = await request<BrifContent[]>(
    `/api/map/places/${placeId}/contents/me`,
    'GET'
  );
  return response.data;
};
