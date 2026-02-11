export interface BoardContent {
  contentId: number;
  content: string;
  contentLength: number;
  fontId: number;
  themeUrl: string;
  createdAt: string;
}

export interface Board {
  boardId: number;
  themeId: number;
  qrUrl: string;
  contents: BoardContent[];
}

export interface BrifContent {
  contentId: number;
  content: string;
  themeUrl: string;
  fontId: number;
  createdAt: string;
}

export interface PlaceDetail {
  placeId: number;
  placeName: string;
  hasBoard: boolean;
  board: {
    boardId: number;
    qrUrl: string;
    themeId: number;
    contents: BoardContent[];
  };
}

export interface UserBoard {
  boardId: number;
  placeName: string;
  themeId: number;
  qrUrl: string;
  contents: BoardContent[];
}

export interface WriteStore {
  boardId: number | null;
  content: string;
  createdAt: Date | null;
  orderNumber: number | null;
  setBoardId: (id: number) => void;
  setContent: (content: string) => void;
  setCreatedAt: (date: Date) => void;
  setOrderNumber: (num: number) => void;
  reset: () => void;
}
