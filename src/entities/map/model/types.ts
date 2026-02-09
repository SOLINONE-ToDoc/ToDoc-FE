import type { PlaceType } from "@/entities/place";

export type Coords = {
  lat: number;
  lng: number;
};

export type LocationStatus =
  | 'idle'
  | 'loading'
  | 'granted'
  | 'denied'
  | 'error';

export type MyPlaceStatus = 'RECENT' | 'VISITED';

export interface MapPlace {
  address: string;
  placeId: number;
  placeType: PlaceType;
  placeName: string;
  latitude: number;
  longitude: number;
  contentCount: number;
  myStatus: MyPlaceStatus | null;
  myContent: string | null;
  lastVisitedAt: string | null;
}

export interface MapPlaceWithMessage extends MapPlace {
  visitMessage: string | null;
  isSelected: boolean;
}
