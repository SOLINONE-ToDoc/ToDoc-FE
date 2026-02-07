import { useEffect, useRef } from 'react';
import type { Coords } from '@/entities/map';
import { MapMarker } from './MapMarker';

interface MapPreviewProps {
  coords: Coords;
}

export const MapPreview = ({ coords }: MapPreviewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const markerInstance = useRef<kakao.maps.CustomOverlay | null>(null);

  useEffect(() => {
  if (!mapRef.current) return;

  if (!mapInstance.current) {
    const container = mapRef.current;
    const center = new kakao.maps.LatLng(coords.lat, coords.lng);
    mapInstance.current = new kakao.maps.Map(container, { center, level: 1 });

    const marker = MapMarker({
      coords,
      isSelected: false,
      onClick: () => {
        console.log("마커 클릭됨");
      }
    });

    marker.setMap(mapInstance.current);
    markerInstance.current = marker;
  }
}, [coords]);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={mapRef}
        className="w-full h-screen"
      />
    </div>
  );
};
