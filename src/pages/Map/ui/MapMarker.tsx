import { createRoot } from "react-dom/client";
import { MARKER } from "../assets/marker";
import type { Coords } from "@/entities/map";

interface MapMarkerOptions {
  coords: Coords;
  isSelected?: boolean;
  onClick?: () => void;
}

export const MapMarker = ({ coords, isSelected = false, onClick }: MapMarkerOptions) => {
  const MarkerComponent = MARKER.svg;

  const el = document.createElement("div");
  el.style.width = `${MARKER.size.width}px`;
  el.style.height = `${MARKER.size.height}px`;
  el.style.cursor = "pointer";
  el.style.transition = "color 0.1s, filter 0.15s";

  const applyStyle = (selected: boolean) => {
    el.style.color = selected ? "#ff5546" : "#404040";
    el.style.filter = selected ? `drop-shadow(0 4px 20px rgba(255,104,104,0.3))` : "none";
  };

  const root = createRoot(el);
  root.render(<MarkerComponent width="100%" height="100%" />);

  applyStyle(isSelected);

  el.onclick = (e) => {
    e.stopPropagation();
    const isNowSelected = el.getAttribute('data-selected') === 'true';
    const nextState = !isNowSelected;

    el.setAttribute('data-selected', String(nextState));
    applyStyle(nextState);
    onClick?.();
  };

  el.setAttribute('data-selected', String(isSelected));

  const overlay = new kakao.maps.CustomOverlay({
    position: new kakao.maps.LatLng(coords.lat, coords.lng),
    content: el,
    xAnchor: 0.7,
    yAnchor: 0.6,
  });

  return overlay;
};
