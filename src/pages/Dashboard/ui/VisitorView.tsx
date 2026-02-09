import { useParams } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { NoteGrid } from '@/widgets/Note';
import { cn } from '@/shared/lib';
import { useBoardStream } from '@/entities/board';

export const VisitorView = () => {

  const { placeId } = useParams<{ placeId: string }>();
  const streamContents = useBoardStream(placeId ? Number(placeId) : null);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const isSmallCount = streamContents.length > 0 && streamContents.length <= 3;

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const updateCenter = () => {
      const containerWidth = containerRef.current!.offsetWidth;
      const containerHeight = containerRef.current!.offsetHeight;
      const canvasWidth = canvasRef.current!.offsetWidth;
      const canvasHeight = canvasRef.current!.offsetHeight;

      if (canvasWidth > 0 && canvasHeight > 0) {
        x.set(-(canvasWidth - containerWidth) / 2);
        y.set(-(canvasHeight - containerHeight) / 2);
      }
    };

    updateCenter();

    const observer = new ResizeObserver(() => {
      updateCenter();
    });

    observer.observe(canvasRef.current);

    return () => observer.disconnect();
  }, [streamContents.length, x, y]);

  return (
    <div ref={containerRef} className="w-full h-screen overflow-hidden bg-[#F9F9F9] relative touch-none">
      <motion.div
        ref={canvasRef}
        drag={!isSmallCount}
        dragConstraints={isSmallCount ? { left: 0, right: 0, top: 0, bottom: 0 } : containerRef}
        dragElastic={isSmallCount ? 0 : 0.1}
        style={{ x, y }}
        className={cn(
          "w-fit will-change-transform",
          isSmallCount ? "p-5" : "p-5 pt-[108px] cursor-grab active:cursor-grabbing"
        )}
      >
        <NoteGrid contents={streamContents} />
      </motion.div>
    </div>
  );
};
