import { useState, useEffect } from 'react';
import { boardService } from '../services/boardService';
import { getBoardStream } from '../services/getBoardStream';
import type { BoardContent } from '../model/types';

export const useProviderBoard = (placeId: number | null) => {
  const [contents, setContents] = useState<BoardContent[]>([]);
  const [placeName, setPlaceName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    if (!placeId) return;
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const res = await boardService.getProviderPlaceDetail(placeId);
        const currentPlace = res.data.places[0];

        if (currentPlace) {
          setPlaceName(currentPlace.placeName);
          setContents(currentPlace.board.contents);
          setQrUrl(currentPlace.board.qrUrl);
        }
      } catch (error) {
        console.error('사장님 보드 로딩 실패:', error);
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

  return { contents, placeName, qrUrl, isLoading };
};
