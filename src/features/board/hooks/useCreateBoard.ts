import { useState } from 'react';
import { createBoard } from '../services/createBoard';
import type { CreateBoardPayload, CreateBoardData } from '../model/types';

export const useCreateBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleCreateBoard = async (payload: CreateBoardPayload): Promise<CreateBoardData | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createBoard(payload);
      if (!result) {
        throw new Error('보드 생성에 실패했습니다.');
      }
      return result;
    } catch (err) {
      const errorObject = err instanceof Error ? err : new Error('Unknown error');
      setError(errorObject);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createBoard: handleCreateBoard,
    isLoading,
    error,
  };
};
