import { Note } from "@/shared/ui/Note";
import { formatDate } from '@/shared/utils';
import { cn } from "@/shared/lib";
import type { BoardContent } from "@/entities/board";

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

  const activeCoords = priorityCoords.slice(0, contents.length);

  const activeRows = activeCoords.map(coord => coord[0]);
  const activeCols = activeCoords.map(coord => coord[1]);

  const minRow = activeRows.length > 0 ? Math.min(...activeRows) : 3;
  const maxRow = activeRows.length > 0 ? Math.max(...activeRows) : 3;
  const minCol = activeCols.length > 0 ? Math.min(...activeCols) : 3;
  const maxCol = activeCols.length > 0 ? Math.max(...activeCols) : 3;

  const rows = Array.from({ length: 7 }, (_, rowIdx) => {
    const isEvenRow = (rowIdx + 1) % 2 === 0;
    const maxCols = isEvenRow ? 8 : 7;
    return Array(maxCols).fill(null);
  });

  contents.slice(0, priorityCoords.length).forEach((content, index) => {
    const [r, c] = priorityCoords[index];
    if (rows[r]) rows[r][c] = content;
  });

  const visibleRows = rows.slice(minRow, maxRow + 1);

  return (
    <div className="flex flex-col gap-[12px] w-fit items-center">
      {visibleRows.map((rowItems, relativeRowIndex) => {
        const actualRowIndex = minRow + relativeRowIndex;
        const visibleCols = rowItems.slice(minCol, maxCol + 1);

        return (
          <div
            key={`row-${actualRowIndex}`}
            className={cn(
              "flex gap-[12px] justify-center",
              actualRowIndex % 2 === 0 ? "ml-[92px]" : "mr-[92px]"
            )}
          >
            {visibleCols.map((item, relativeColIndex) => {
              const actualColIndex = minCol + relativeColIndex;
              return (
                <div key={`cell-${actualRowIndex}-${actualColIndex}`} className="w-[168px]">
                  {item ? (
                    <Note
                      size="sm"
                      rotation="none"
                      content={item.content}
                      date={formatDate(item.createdAt)}
                      baseZIndex={50 + actualRowIndex}
                      bgImage={item.themeUrl || undefined}
                    />
                  ) : (
                    <div className="w-[168px]" />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
