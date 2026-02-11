
import type { PlaceType } from "@/entities/place";

export interface RegisterPlacePayload {
  placeName: string;
  placeType: PlaceType;
  latitude: number;
  longitude: number;
  address: string;
  zoneCode: string;
  businessNumber: string;
  openedAt: string;
}
