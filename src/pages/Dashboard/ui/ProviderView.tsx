import { useRef, useState } from 'react';
import { Note } from '@/shared/ui/Note';
import { DUMMY_CONTENTS } from './dummys';
import { formatDate } from '@/shared/utils';

type RandomNote = {
  x: number;
  y: number;
  rotation: 'left' | 'right' | 'none';
  zIndex: number;
  bgImage: string;
};

export const ProviderView = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const NOTE_W = 168;
  const NOTE_H = 228;
  const MIN_DISTANCE = 110;

const [randomNotes] = useState<RandomNote[]>(() => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const placed: RandomNote[] = [];

  DUMMY_CONTENTS.forEach((item, i) => {
    let attempt = 0;
    let x = 0;
    let y = 0;

    while (attempt < 20) {
      x = Math.random() * (vw - NOTE_W);
      y = Math.random() * (vh - NOTE_H);

      const tooClose = placed.some(p => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.hypot(dx, dy) < MIN_DISTANCE;
      });

      if (!tooClose) break;
      attempt++;
    }

    const bgImage = item.themeUrl && item.themeUrl !== "" ? item.themeUrl : "";

    placed.push({
      x,
      y,
      rotation: Math.random() < 0.33 ? 'left' : Math.random() < 0.66 ? 'right' : 'none',
      zIndex: i,
      bgImage,
    });
  });

  return placed;
});

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-hidden relative touch-none"
    >
      <div className="relative w-full h-full">
        {randomNotes.map((random, index) => {
          const item = DUMMY_CONTENTS[index];

          return (
            <Note
              key={item.contentId}
              size="sm"
              content={item.content}
              date={formatDate(item.createdAt)}
              rotation={random.rotation}
              baseZIndex={random.zIndex}
              bgImage={random.bgImage}
              style={{
                position: 'absolute',
                left: `${random.x}px`,
                top: `${random.y}px`,
              }}
              className="hover:scale-105 transition-transform"
            />
          );
        })}
      </div>
    </div>
  );
};
