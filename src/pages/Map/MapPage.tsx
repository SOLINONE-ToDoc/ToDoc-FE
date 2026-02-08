import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { MapPreview } from "./ui/MapPreview";
import { useCurrentLocation, useMapPlaces } from "@/features/map";
import type { Coords, MapPlaceWithMessage } from "@/entities/map";
import { getDistance } from "@/shared/lib";
import { getRelativeVisitText } from '@/shared/utils';

export const MapPage = () => {
  const { coords: myLocation, status } = useCurrentLocation();
  const [center, setCenter] = useState<Coords | null>(null);
  const lastFetchedCenter = useRef<Coords | null>(null);
  const lastZoomLevel = useRef<number | null>(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

  if (!center && status === 'granted' && myLocation) {
    setCenter(myLocation);
  }

  useEffect(() => {
    if (status === 'granted' && myLocation && !center) {
      setTimeout(() => {
        setCenter(myLocation);
        lastFetchedCenter.current = myLocation;
        lastZoomLevel.current = 1;
      }, 0);
    }
  }, [status, myLocation, center]);

  // useEffect(() => {
  //   const mock = { lat: 37.561478, lng: 126.985707 };
  //   setCenter(mock);
  //   lastFetchedCenter.current = mock;
  // }, []);

  const { places } = useMapPlaces(center);

  const handleMapIdle = useCallback((newCoords: Coords, currentLevel: number) => {
    const isZoomChanged = lastZoomLevel.current !== null && lastZoomLevel.current !== currentLevel;

    if (isZoomChanged) {
      lastZoomLevel.current = currentLevel;
      return;
    }

    if (!lastFetchedCenter.current) {
      lastFetchedCenter.current = newCoords;
      return;
    }

    const distance = getDistance(lastFetchedCenter.current, newCoords);

    if (distance > 150) {
      lastFetchedCenter.current = newCoords;
      setCenter(newCoords);
    }
  }, []);

  const handleMarkerClick = useCallback((placeId: number) => {
    setSelectedMarkerId(prev => (prev === placeId ? null : placeId));
  }, []);

  const placesWithMessage: MapPlaceWithMessage[] = useMemo(() => {
    if (!center) return [];

    return places.map(place => {
      const isSelected = selectedMarkerId === place.placeId;
      let visitMessage: string | null = null;

      if (place.myStatus === 'VISITED') {
        const distance = getDistance(
          { lat: place.latitude, lng: place.longitude },
          center
        );

        if ((isSelected || distance < 150) && place.myContent) {
          visitMessage = place.myContent;
        }
        else if (place.lastVistedAt) {
          visitMessage = getRelativeVisitText(place.lastVistedAt);
        }
      }

      if (place.myStatus === null && isSelected) {
        visitMessage = '방문 전';
      }

      return {
        ...place,
        isSelected,
        visitMessage,
      };
    });
  }, [places, selectedMarkerId, center]);

  if (!center || status === 'loading' || status === 'idle' || (status === 'granted' && !center)) {
    return <div>로딩 스피너</div>;
  }

  if (status === "denied") {
    return <div>권한거부+재시도버튼</div>;
  }

  if (status === "error") {
    return <div>에러</div>;
  }

  return (
    <div className="w-full h-screen">
      <MapPreview
        initialCenter={center}
        selectedPlaceId={selectedMarkerId}
        places={placesWithMessage}
        onIdle={handleMapIdle}
        onMarkerClick={handleMarkerClick}
      />
    </div>
  );
};
