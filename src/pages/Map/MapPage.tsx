import { MapPreview } from "./ui/MapPreview";
import { useCurrentLocation } from "@/features/map";

export const MapPage = () => {
  const { coords, status } = useCurrentLocation();

  if (status === "loading" || coords === null) {
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
      <MapPreview coords={coords} />
    </div>
  );
};
