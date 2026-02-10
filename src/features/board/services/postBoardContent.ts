import { request } from "@/shared/api";
import type { PostContentRequest, PostContentResponse } from "../model/types";

export const postBoardContent = async (
  placeId: string,
  coords: { latitude: number; longitude: number },
  data: PostContentRequest
) => {
  const queryString = `latitude=${coords.latitude}&longitude=${coords.longitude}`;

  return await request<PostContentResponse>(
    `/api/boards/${placeId}/contents?${queryString}`,
    'POST',
    data
  );
};
