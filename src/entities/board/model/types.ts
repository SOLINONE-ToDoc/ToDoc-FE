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
