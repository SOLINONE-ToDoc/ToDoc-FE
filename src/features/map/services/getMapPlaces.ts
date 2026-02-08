import { request } from '@/shared/api';
import type { MapPlace } from '@/entities/map';
import type { GetMapPlacesParams } from '../model/types';

export const getMapPlaces = ({
  lat,
  lng,
  radius = 1000,
  ui = 'LIST',
}: GetMapPlacesParams) => {

  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    radius: radius.toString(),
    ui,
  });

  return request<MapPlace[]>(`/api/map/places?${params.toString()}`, 'GET');
};
