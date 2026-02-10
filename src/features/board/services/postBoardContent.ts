import { request } from "@/shared/api";
import type { PostContentRequest, PostContentResponse } from "../model/types";

export const postBoardContent = async (
  placeId: string,
  data: PostContentRequest & {
    userLatitude: number;
    userLongitude: number;
  }
) => {
  return await request<PostContentResponse>(
    `/api/boards/${placeId}/contents`,
    'POST',
    data
  );
};
