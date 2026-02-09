import { request } from '@/shared/api';
import type { CreateBoardPayload, CreateBoardData } from '../model/types';
import type { ApiSuccessResponse } from '@/shared/api/types';

export const createBoard = async (
  payload: CreateBoardPayload
): Promise<CreateBoardData | null> => {
  try {
    const res: ApiSuccessResponse<CreateBoardData> = await request('/api/boards', 'POST', payload);

    return res.data;
  } catch (err) {
    console.error('보드 생성 실패:', err);
    return null;
  }
};
