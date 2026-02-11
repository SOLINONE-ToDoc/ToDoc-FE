import { request } from '@/shared/api';
import type { Theme } from '../model/types';

export const fetchThemeList = async (): Promise<Theme[]> => {
  const res = await request<Theme[]>('/api/themes', 'GET');
  return res.data;
};
