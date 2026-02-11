import { useParams, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { NoteGrid } from '@/widgets/Note';
import { cn } from '@/shared/lib';
import { useVisitorBoard } from '@/entities/board';
import { usePlaceStore } from '@/entities/place';
import { WriteButton } from './WriteButton';
import { PlaceTag } from './PlaceTag';
import { useFontPreload } from '@/shared/hooks';

export const VisitorView = () => {
  const navigate = useNavigate();
  const { placeId } = useParams<{ placeId: string }>();
  const { setLastSelectedPlaceId } = usePlaceStore();

  useEffect(() => {
    if (placeId) {
      setLastSelectedPlaceId(Number(placeId));
    }
  }, [placeId, setLastSelectedPlaceId]);

  const { contents, placeName } = useVisitorBoard(Number(placeId));

  const fontIds = contents.map((c) => c.fontId);
  useFontPreload(fontIds);

  const handleWriteNavigation = () => {
    if (placeId) {
      navigate(`/place/${placeId}/write`);
    }
  };

  const handleMyNote = () => {
    // 내 보드 찾는거 만들어야함
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const updateCenter = () => {
      const containerRect = containerRef.current!.getBoundingClientRect();
      const canvasRect = canvasRef.current!.getBoundingClientRect();

      if (canvasRect.width > 0 && canvasRect.height > 0) {
        x.set(-(canvasRect.width - containerRect.width) / 2);
        y.set(-(canvasRect.height - containerRect.height) / 2);
      }
    };

    updateCenter();
    const observer = new ResizeObserver(updateCenter);
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [contents.length, x, y]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-hidden bg-[#F9F9F9] relative"
    >
      <motion.div
        ref={canvasRef}
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        dragMomentum
        dragTransition={{ power: 0.2, timeConstant: 200 }}
        style={{ x, y }}
        className={cn(
          "w-fit will-change-transform p-[100px] cursor-grab active:cursor-grabbing"
        )}
      >
        <NoteGrid contents={contents} />
      </motion.div>
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <div className="absolute left-[24px] bottom-[32px] pointer-events-auto">
          <PlaceTag placeName={placeName} />
        </div>
        <div className="absolute right-[24px] bottom-[24px] pointer-events-auto">
          <WriteButton
            onWriteClick={handleWriteNavigation}
            onSearchMyNoteClick={handleMyNote}
          />
        </div>
      </div>
    </div>
  );
};
