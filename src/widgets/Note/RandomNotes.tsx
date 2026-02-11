import { useEffect, useRef, useState } from 'react';
import { Note } from '@/shared/ui/Note';
import { formatDate } from '@/shared/utils';
import type { BoardContent } from '@/entities/board';
import { FONT_MAP } from '@/entities/font';

interface NotePosition {
  x: number;
  y: number;
  rotation: 'left' | 'right' | 'none';
  zIndex: number;
}

export const RandomNotes = ({ contents }: { contents: BoardContent[] }) => {
  const NOTE_W = 168;
  const NOTE_H = 228;
  const MIN_DISTANCE = 110;

  const [positions, setPositions] = useState<Record<number, NotePosition>>({});
  const positionsRef = useRef<Record<number, NotePosition>>({});

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let hasNew = false;

    contents.forEach((item, i) => {
      if (positionsRef.current[item.contentId]) return;
      hasNew = true;

      let x = 0; let y = 0; let attempt = 0;
      while (attempt < 30) {
        x = Math.random() * (vw - NOTE_W);
        y = Math.random() * (vh - NOTE_H);
        const tooClose = Object.values(positionsRef.current).some(
          p => Math.hypot(p.x - x, p.y - y) < MIN_DISTANCE
        );
        if (!tooClose) break;
        attempt++;
      }

      positionsRef.current[item.contentId] = {
        x, y,
        rotation: Math.random() < 0.33 ? 'left' : Math.random() < 0.66 ? 'right' : 'none',
        zIndex: i + 10,
      };
    });

    if (hasNew) {
      setPositions({ ...positionsRef.current });
    }
  }, [contents]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {contents.map(item => {
        const pos = positions[item.contentId];
        if (!pos) return null;

        return (
          <Note
            key={item.contentId}
            size="sm"
            content={item.content}
            date={formatDate(item.createdAt)}
            rotation={pos.rotation}
            baseZIndex={pos.zIndex}
            bgImage={item.themeUrl || undefined}
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
                fontFamily: `"${FONT_MAP[item.fontId]?.fontFamily}"`,
              }}
          />
        );
      })}
    </div>
  );
};
