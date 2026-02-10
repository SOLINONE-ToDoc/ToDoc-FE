import { useCallback } from "react";
import { useLocationStore } from "@/entities/map";

export const useCurrentLocation = () => {
  const { coords, status, setCoords, setStatus } = useLocationStore();

  const handleLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setStatus("granted");
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setStatus("denied");
        } else {
          setStatus("error");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [setCoords, setStatus]);

  return { coords, status, handleLocation };
};
