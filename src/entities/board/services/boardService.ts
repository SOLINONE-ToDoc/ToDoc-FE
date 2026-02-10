import { request } from '@/shared/api';
import type { ProviderPlaceDetailData, Board } from '../model/types';

export const boardService = {
  getProviderPlaceDetail: async (placeId: number) => {
    return request<ProviderPlaceDetailData>(`/api/provider/places/${placeId}`, 'GET');
  },

  getBoardDetail: async (placeId: number) => {
    return request<Board>(`/api/boards/${placeId}`, 'GET');
  }
};
