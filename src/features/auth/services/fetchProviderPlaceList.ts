import { request } from '@/shared/api';
import type { ProviderPlace } from '@/entities/provider';

interface ProviderHomeResponse {
  places: ProviderPlace[];
}

export const fetchProviderPlaceList = async (): Promise<ProviderPlace[]> => {
  try {
    const data = await request<ProviderHomeResponse>(
      '/api/provider/home',
      'GET'
    );

    return data.places;
  } catch (err) {
    console.error('provider place 조회 실패', err);
    return [];
  }
};
