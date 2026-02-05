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
