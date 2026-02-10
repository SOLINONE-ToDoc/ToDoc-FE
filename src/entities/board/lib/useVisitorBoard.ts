import { useState, useEffect } from 'react';
import { boardService } from '../services/boardService';
import { getBoardStream } from '../services/getBoardStream';
import type { BoardContent } from '../model/types';

export const useVisitorBoard = (placeId: number | null) => {
  const [contents, setContents] = useState<BoardContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [qrUrl, setQrUrl] = useState('');
  const [themeId, setThemeId] = useState<number | null>(null);

  useEffect(() => {
    if (!placeId) return;

    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const res = await boardService.getBoardDetail(placeId);
        const boardData = res.data;

        if (boardData) {
          setContents(boardData.contents);
          setQrUrl(boardData.qrUrl);
          setThemeId(boardData.themeId);
        }
      } catch (error) {
        console.error('방문자 보드 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();

    const es = getBoardStream(placeId);

    const handleNewContent = (event: MessageEvent) => {
      try {
        const newData: BoardContent = JSON.parse(event.data);
        setContents((prev) => {
          if (prev.some((c) => c.contentId === newData.contentId)) return prev;
          return [newData, ...prev];
        });
      } catch (e) {
        console.error('SSE 수신 에러:', e);
      }
    };

    es.addEventListener('new-content', handleNewContent);

    return () => {
      es.removeEventListener('new-content', handleNewContent);
      es.close();
      setContents([]);
    };
  }, [placeId]);

  return { contents, qrUrl, themeId, isLoading };
};
