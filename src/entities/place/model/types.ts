import type { Board } from "@/entities/board";

export type PlaceType =
  | 'RESTAURANT'
  | 'CAFE'
  | 'BANK'
  | 'MART'
  | 'CONVENIENCE_STORE'
  | 'OTHER';

export interface Place {
  id: string;
  name: string;
  address: string;
  zonecode: string;
  type: PlaceType;
  latitude: string;
  longitude: string;
}

export interface ProviderPlaceDetail {
  placeId: number;
  placeName: string;
  hasBoard: boolean;
  board: Board | null;
}

export interface ProviderPlaceDetailResponse {
  places: ProviderPlaceDetail[];
}
