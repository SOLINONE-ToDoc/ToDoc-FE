import type { PlaceType } from '../model/types';

export const mapKakaoCategoryToPlaceType = (code: string): PlaceType => {
  const mapping: Record<string, PlaceType> = {
    'FD6': 'RESTAURANT',
    'CE7': 'CAFE',
    'BK9': 'BANK',
    'MT1': 'MART',
    'CS2': 'CONVENIENCE_STORE',
  };

  return mapping[code] || 'OTHER';
};
