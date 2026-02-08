import { createRoot } from "react-dom/client";
import { MARKER } from "../assets/marker";
import type { MapPlace } from '@/entities/map';

interface MapMarkerOptions {
  place: MapPlace;
  visitMessage: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const createMapMarker = ({ place, visitMessage, isSelected = false, onClick }: MapMarkerOptions) => {
  const { latitude, longitude } = place;

  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = `${MARKER.size.width}px`;
  container.style.height = `${MARKER.size.height}px`;
  container.style.cursor = "pointer";
  container.style.webkitUserSelect = "none";

  const iconDiv = document.createElement("div");
  iconDiv.style.width = `${MARKER.size.width}px`;
  iconDiv.style.height = `${MARKER.size.height}px`;
  container.appendChild(iconDiv);

  const MarkerIcon = MARKER.svg;
  const root = createRoot(iconDiv);
  root.render(<MarkerIcon width="100%" height="100%" />);

  const textStroke = `
    -1px -1px 0 #FEFEFE,
    1px -1px 0 #FEFEFE,
    -1px  1px 0 #FEFEFE,
    1px  1px 0 #FEFEFE
  `;

  const messageDiv = document.createElement("div");
  messageDiv.style.position = "absolute";
  messageDiv.style.bottom = `${MARKER.size.height + 4}px`;
  messageDiv.style.left = "50%";
  messageDiv.style.transform = "translateX(-50%)";
  messageDiv.style.padding = "4px 8px";
  messageDiv.style.borderRadius = "8px";
  messageDiv.style.backgroundColor = "#fff";
  messageDiv.style.border = "1px solid #e9e9e9";
  messageDiv.style.fontSize = "12px";
  messageDiv.style.fontWeight = "600";
  messageDiv.style.color = "#000";
  messageDiv.style.whiteSpace = "nowrap";
  messageDiv.style.textAlign = "center";
  messageDiv.style.pointerEvents = "none";
  container.appendChild(messageDiv);

  const updateMessage = (msg: string | null, selected: boolean) => {
    if (msg || (selected && place.myStatus === null)) {
      messageDiv.innerText = msg || "방문 전";
      messageDiv.style.display = 'block';
    } else {
      messageDiv.style.display = 'none';
    }
  };
  updateMessage(visitMessage, isSelected);

  const textContainer = document.createElement("div");
  textContainer.style.display = "flex";
  textContainer.style.flexDirection = "column";
  textContainer.style.alignItems = "center";
  textContainer.style.position = "absolute";
  textContainer.style.top = `${MARKER.size.height}px`;
  textContainer.style.left = "50%";
  textContainer.style.transform = "translateX(-50%)";
  textContainer.style.lineHeight = "1.2";
  container.appendChild(textContainer);

  const nameDiv = document.createElement("div");
  nameDiv.innerText = place.placeName;
  nameDiv.style.fontSize = "14px";
  nameDiv.style.fontWeight = "600";
  nameDiv.style.whiteSpace = "nowrap";
  nameDiv.style.textShadow = textStroke;
  nameDiv.style.letterSpacing = "-0.4px";
  nameDiv.style.color = "#000";
  textContainer.appendChild(nameDiv);

  if (place.contentCount > 0) {
    const countDiv = document.createElement("div");
    countDiv.innerText = `${place.contentCount}개`;
    countDiv.style.fontSize = "12px";
    countDiv.style.fontWeight = "600";
    countDiv.style.textShadow = textStroke;
    countDiv.style.color = "#1B59F8";
    countDiv.style.letterSpacing = "-0.4px";
    countDiv.style.marginTop = "0px";
    textContainer.appendChild(countDiv);
  }

  const markerDiv = document.createElement("div");
  markerDiv.style.width = `${MARKER.size.width}px`;
  markerDiv.style.height = `${MARKER.size.height}px`;
  container.appendChild(markerDiv);

  const applyStyle = (selected: boolean) => {
    container.style.color = selected ? "#ff5546" : "#404040";
    container.style.filter = selected
      ? `drop-shadow(0 4px 20px rgba(255,104,104,0.3))`
      : `drop-shadow(0 4px 20px rgba(0,0,0,0.1))`;
  };
  applyStyle(isSelected);

  container.onclick = (e) => {
    e.stopPropagation();
    onClick?.();
  };

  const overlay = new kakao.maps.CustomOverlay({
    position: new kakao.maps.LatLng(latitude, longitude),
    content: container,
    xAnchor: 0.5,
    yAnchor: 1.3,
  });

  return {
    overlay,
    update: (newVisitMessage: string, newIsSelected: boolean) => {
      updateMessage(newVisitMessage, newIsSelected);
      applyStyle(newIsSelected);
    },
    setMap: (mapInstance: kakao.maps.Map | null) => {
      overlay.setMap(mapInstance);
    }
  };
};
