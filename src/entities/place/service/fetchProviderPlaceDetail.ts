import { request } from '@/shared/api';
import type { ProviderPlaceDetail, ProviderPlaceDetailResponse} from '../model/types';

export const fetchProviderPlaceDetail = async (
  placeId: number
): Promise<ProviderPlaceDetail | null> => {
  const res = await request<ProviderPlaceDetailResponse>(
    `/api/provider/places/${placeId}`,
    'GET'
  );

  return res.data.places[0] ?? null;
};
