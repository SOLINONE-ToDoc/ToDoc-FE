import type { Board } from '@/entities/board';

export interface ProviderPlace {
  placeId: number;
  placeName: string;
  hasBoard: boolean;
  board: Board | null;
}
