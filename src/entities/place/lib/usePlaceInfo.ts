
import { useVisitorBoard } from '@/entities/board';

export const usePlaceInfo = (placeId: number) => {
  const { placeName } = useVisitorBoard(placeId);

  return {
    placeName: placeName,
  };
};
