import { Note } from "@/shared/ui/Note";
import { formatDate } from '@/shared/utils';
import { cn } from "@/shared/lib";
import type { BoardContent } from "@/entities/board";
import { FONT_MAP } from "@/entities/font";

interface NoteGridProps {
  contents: BoardContent[];
}

export const NoteGrid = ({ contents }: NoteGridProps) => {
  const priorityCoords = [
    [3, 3], [3, 4], [3, 2], [4, 2], [4, 3], [4, 4], [2, 2], [2, 3], [2, 4],
    [3, 1], [3, 5], [3, 0], [3, 6], [4, 1], [4, 5], [4, 0], [4, 6],
    [2, 1], [2, 5], [2, 0], [2, 6], [5, 3], [5, 4], [5, 2], [5, 5], [5, 1],
    [5, 6], [5, 0], [5, 7], [1, 3], [1, 4], [1, 2], [1, 5], [1, 1], [1, 6],
    [1, 0], [1, 7], [6, 3], [6, 2], [6, 4], [6, 1], [6, 5], [6, 0], [6, 6],
    [0, 3], [0, 2], [0, 4], [0, 1], [0, 5], [0, 0], [0, 6]
  ];

  const DRAG_THRESHOLD = 6;

  const activeCoords = priorityCoords.slice(0, contents.length);
  const activeRows = activeCoords.map(coord => coord[0]);
  const minRow = activeRows.length > 0 ? Math.min(...activeRows) : 3;
  const maxRow = activeRows.length > 0 ? Math.max(...activeRows) : 3;

  const gridMap = Array.from({ length: 7 }, () => Array(8).fill(null));

  contents.slice(0, priorityCoords.length).forEach((content, index) => {
    const [r, c] = priorityCoords[index];
    gridMap[r][c] = content;
  });

  return (

    <div className="flex flex-col gap-[12px] w-full items-center py-10 overflow-x-hidden">
      {gridMap.slice(minRow, maxRow + 1).map((rowItems, relativeRowIndex) => {
        const actualRowIndex = minRow + relativeRowIndex;

        const isOffsetRow = actualRowIndex % 2 !== 0;

        return (

          <div
            key={`row-${actualRowIndex}`}
            className={cn(
              "flex gap-[12px] shrink-0 transition-all duration-500",
              isOffsetRow ? "pl-[90px]" : "pr-[90px]"
            )}
          >
            {rowItems.map((item, colIndex) => (
              <div
                key={`cell-${actualRowIndex}-${colIndex}`}
                className="w-[168px] shrink-0"
              >
                {item ? (
                  <div
                    onPointerDown={(e) => {
                      e.currentTarget.setPointerCapture(e.pointerId);
                      e.currentTarget.dataset.startX = String(e.clientX);
                      e.currentTarget.dataset.startY = String(e.clientY);
                      e.currentTarget.dataset.dragged = 'false';
                    }}
                    onPointerMove={(e) => {
                      const sx = Number(e.currentTarget.dataset.startX);
                      const sy = Number(e.currentTarget.dataset.startY);

                      if (Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > DRAG_THRESHOLD) {
                        e.currentTarget.dataset.dragged = 'true';
                      }
                    }}
                    onPointerUp={(e) => {
                      const dragged = e.currentTarget.dataset.dragged === 'true';
                      e.currentTarget.releasePointerCapture(e.pointerId);

                      if (!dragged) {
                        console.log('NOTE SELECTED:', item.contentId);
                      }
                    }}
                    className="w-[168px] shrink-0"
                  >
                    <Note
                      size="sm"
                      rotation="none"
                      content={item.content}
                      date={formatDate(item.createdAt)}
                      baseZIndex={50 + actualRowIndex}
                      bgImage={item.themeUrl || undefined}
                      style={{
                        fontFamily: FONT_MAP[item.fontId]?.fontFamily,
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-[168px] h-[168px]" />
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
