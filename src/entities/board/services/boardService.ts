import { request } from '@/shared/api';
import type { UserBoard } from '../model/types';
import type { ProviderPlaceDetailResponse } from '@/entities/place';

export const boardService = {
  getProviderPlaceDetail: async (placeId: number) => {
    return request<ProviderPlaceDetailResponse>(`/api/provider/places/${placeId}`, 'GET');
  },

  getBoardDetail: async (placeId: number) => {
    return request<UserBoard>(`/api/boards/${placeId}`, 'GET');
  }
};
