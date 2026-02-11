import { request } from '@/shared/api';
import type { BoostPayload } from '../model/types';

export const boostContent = async (
  placeId: number,
  payload: BoostPayload
): Promise<boolean> => {
  try {
    await request<void>(`/api/boards/${placeId}/contents/boost`, 'POST', payload);
    return true;
  } catch (err) {
    console.error('방명록 끌어올리기 실패:', err);
    return false;
  }
};
