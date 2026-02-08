import { request } from '@/shared/api';
import type { ProviderPlace } from '@/entities/provider';

interface ProviderHomeData {
  places: ProviderPlace[];
}

export const fetchProviderPlaceList = async (): Promise<ProviderPlace[]> => {
  try {
    const res = await request<ProviderHomeData>('/api/provider/home', 'GET');

    return res.data.places || [];
  } catch (err) {
    console.error('provider place 조회 실패', err);
    return [];
  }
};
