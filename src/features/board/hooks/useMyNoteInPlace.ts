import { useState, useCallback } from 'react';
import type { BrifContent } from '@/entities/board';
import { fetchPlaceMyContent } from '@/features/map';

export const useMyNoteInPlace = () => {
  const [myContents, setMyContents] = useState<BrifContent[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMyNotes = useCallback(async (placeId: number) => {
    if (isFetched) return myContents;

    setIsLoading(true);
    try {
      const data = await fetchPlaceMyContent(placeId);
      setMyContents(data);
      setIsFetched(true);
      return data;
    } finally {
      setIsLoading(false);
    }
  }, [isFetched, myContents]);

  const hasMyNote = useCallback(
    async (placeId: number, contentId: number) => {
      const data = isFetched ? myContents : await fetchMyNotes(placeId);
      return data.some((c) => c.contentId === contentId);
    },
    [isFetched, myContents, fetchMyNotes]
  );

  return {
    myContents,
    isLoading,
    fetchMyNotes,
    hasMyNote,
  };
};
