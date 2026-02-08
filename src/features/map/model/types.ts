export interface GetMapPlacesParams {
  lat: number;
  lng: number;
  radius?: number;
  ui?: 'MAP' | 'LIST';
}
