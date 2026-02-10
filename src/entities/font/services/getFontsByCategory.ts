import { request } from "@/shared/api";
import type { FontRecommend } from "../model/types";

export const getFontsByCategory = async (category: string) => {

  return await request<FontRecommend[]>(`/api/fonts?category=${category}`, 'GET');
};
