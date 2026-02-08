import { useEffect, useState } from 'react';
import { getMapPlaces } from '../services/getMapPlaces';
import type { MapPlace, Coords } from '@/entities/map';

export const useMapPlaces = (coords: Coords | null) => {
  const [places, setPlaces] = useState<MapPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!coords) return;

    let cancelled = false;

    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        const data = await getMapPlaces({ lat: coords.lat, lng: coords.lng });
        if (!cancelled) setPlaces(data);
      } catch (err) {
        console.error('주변 장소 로딩 실패:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchPlaces();
    return () => { cancelled = true; };
  }, [coords]);

  return { places, isLoading };
};
