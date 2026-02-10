export interface CreateBoardPayload {
  placeId: number;
  themeId: number;
}

export interface CreateBoardData {
  message: string;
}

export interface PostContentRequest {
  fontId: number;
  content: string;
  themeUrl: string;
}

export interface PostContentResponse {
  contentId: number;
  placeName: string;
  orderNumber: number;
  content: string;
  fontId: number;
  fontName: string;
  fontField: string;
  fontCategory: string;
  themeUrl: string;
  createdAt: string;
}
