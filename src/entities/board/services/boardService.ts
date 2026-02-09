import { request } from '@/shared/api';
import type { ProviderPlaceDetailData } from '../model/types';

export const boardService = {
  getProviderPlaceDetail: async (placeId: number) => {
    return request<ProviderPlaceDetailData>(`/api/provider/places/${placeId}`, 'GET');
  }
};
