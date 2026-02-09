import { useState, useEffect } from "react";
import type { BoardContent } from "../model/types";
import { getBoardStream } from "../service/getBoardStream";

export const useBoardStream = (placeId: number | null) => {
  const [contents, setContents] = useState<BoardContent[]>([]);

  useEffect(() => {
    if (!placeId) return;

    const es = getBoardStream(placeId);

    const handleNewContent = (event: MessageEvent) => {
      try {
        const data: BoardContent = JSON.parse(event.data);
        setContents((prev) => {
          if (prev.some((c) => c.contentId === data.contentId)) return prev;
          return [data, ...prev];
        });
      } catch (e) {
        console.error('데이터 파싱 에러:', e);
      }
    };

    es.addEventListener('new-content', handleNewContent);

    return () => {
      es.removeEventListener('new-content', handleNewContent);
      es.close();
      setContents([]);
    };
  }, [placeId]);

  return contents;
};
