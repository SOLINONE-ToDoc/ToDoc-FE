import { useEffect, useRef, useMemo } from 'react';
import { debounce } from 'lodash';
import type { Coords, MapPlaceWithMessage } from '@/entities/map';
import { createMapMarker } from './MapMarker';

interface MapMarkerInstance {
  overlay: kakao.maps.CustomOverlay;
  update: (newVisitMessage: string | null, newIsSelected: boolean) => void;
  setMap: (mapInstance: kakao.maps.Map | null) => void;
}

interface MapPreviewProps {
  initialCenter: Coords;
  selectedPlaceId: number | null;
  places: MapPlaceWithMessage[];
  onIdle: (newCenter: Coords, level: number) => void;
  onMarkerClick: (placeId: number) => void;
  onMapClick: () => void;
}

export const MapPreview = ({
  initialCenter,
  places,
  onIdle,
  onMarkerClick,
  onMapClick,
}: MapPreviewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<Map<number, MapMarkerInstance>>(new Map());

  const debouncedCenterChange = useMemo(
    () => debounce((map: kakao.maps.Map) => {
      onIdle({
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      }, map.getLevel());
    }, 500),
    [onIdle]
  );

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const container = mapRef.current;
    const kakaoCenter = new kakao.maps.LatLng(initialCenter.lat, initialCenter.lng);

    mapInstance.current = new kakao.maps.Map(container, { center: kakaoCenter, level: 3 });

    kakao.maps.event.addListener(mapInstance.current, 'idle', () => {
      if (!mapInstance.current) return;
      debouncedCenterChange(mapInstance.current);
    });

    kakao.maps.event.addListener(mapInstance.current, 'zoom_changed', () => {
      if (!mapInstance.current) return;
      debouncedCenterChange(mapInstance.current);
    });

    kakao.maps.event.addListener(mapInstance.current, 'click', () => {
      onMapClick();
    });

    return () => {
      debouncedCenterChange.cancel();
    };
  }, [initialCenter, debouncedCenterChange, onMapClick]);

  useEffect(() => {
  if (!mapInstance.current) return;

  const markerMap = markersRef.current;

  places.forEach(place => {
    const existing = markerMap.get(place.placeId);

    if (existing) {
      existing.update(place.visitMessage, place.isSelected);
    } else {
      const marker = createMapMarker({
        place,
        visitMessage: place.visitMessage,
        isSelected: place.isSelected,
        onClick: () => onMarkerClick(place.placeId),
      });
      marker.setMap(mapInstance.current);
      markerMap.set(place.placeId, marker);
    }
  });

  Array.from(markerMap.keys()).forEach(placeId => {
    if (!places.find(p => p.placeId === placeId)) {
      const marker = markerMap.get(placeId)!;
      marker.setMap(null);
      markerMap.delete(placeId);
    }
  });
}, [places, onMarkerClick]);

  return <div ref={mapRef} className="w-full h-[calc(100vh-30px)] relative" />;
};
