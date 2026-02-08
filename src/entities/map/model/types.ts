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
  placeId: number;
  placeName: string;
  latitude: number;
  longitude: number;
  contentCount: number;
  myStatus: MyPlaceStatus | null;
  myContent: string | null;
  lastVistedAt: string | null;
}

export interface MapPlaceWithMessage extends MapPlace {
  visitMessage: string | null;
  isSelected: boolean;
}
