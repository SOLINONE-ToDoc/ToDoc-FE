import { useEffect, useRef } from 'react';

interface MapPreviewProps {
  lat: number;
  lng: number;
}

export const MapPreview = ({ lat, lng }: MapPreviewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const container = mapRef.current;
    const center = new kakao.maps.LatLng(lat, lng);

    const options = {
      center,
      level: 3,
    };

    if (!mapInstance.current) {
      mapInstance.current = new kakao.maps.Map(container, options);

      const marker = new kakao.maps.Marker({
        position: center,
      });
      marker.setMap(mapInstance.current);
    } else {
      mapInstance.current.setCenter(center);
    }
  }, [lat, lng]);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={mapRef}
        className="w-full h-[500px] rounded-xl border-2 border-gray-100 shadow-sm"
      />
    </div>
  );
};

export default MapPreview;

