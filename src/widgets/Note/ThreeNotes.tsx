import { Note } from "@/shared/ui/Note";
import { formatDate } from "@/shared/utils";
import type { BrifContent } from '@/entities/board';
import { FONT_MAP } from '@/entities/font';

interface ThreeNotesProps {
  contents: BrifContent[];
}

export const ThreeNotes = ({ contents }: ThreeNotesProps) => {
  const displayContents = contents?.slice(0, 3) ?? [];

  if (displayContents.length === 0) return null;

  return (
    <div className="flex gap-4 overflow-x-auto flex-nowrap py-2 px-2 scrollbar-hide">
      {displayContents.map((item) => (
        <div key={item.contentId} className="flex-shrink-0">
          <Note
            content={item.content}
            date={formatDate(item.createdAt)}
            size="sm"
            baseZIndex={1000}
            bgImage={item.themeUrl ?? undefined}
            style={{
              fontFamily: FONT_MAP[item.fontId]?.fontFamily,
            }}
          />
        </div>
      ))}
    </div>
  );
};

