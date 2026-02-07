import { useState, useEffect } from "react";
import type { Coords, LocationStatus } from "@/entities/map";

export const useCurrentLocation = () => {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [status, setStatus] = useState<LocationStatus>("loading");

  useEffect(() => {
    const handleLocation = async () => {
      if (!navigator.geolocation) {
        setTimeout(() => setStatus("error"), 0);
        return;
      }

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
        { enableHighAccuracy: true }
      );
    };

    handleLocation();
  }, []);

  return { coords, status };
};
