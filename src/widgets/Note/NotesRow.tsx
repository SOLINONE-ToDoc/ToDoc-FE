import { Note } from '@/shared/ui/Note';
import type { BrifContent } from '@/entities/board';
import { formatDate } from '@/shared/utils';

interface NotesRowProps {
  contents: BrifContent[];
}

export const NotesRow = ({ contents }: NotesRowProps) => {
  if (contents.length === 0) return null;

  const total = contents.length;

  return (
    <div className="flex overflow-x-auto p-3 scrollbar-hide">
      {contents.map((item, index) => {
        const isOdd = index % 2 === 0;
        return (
          <div
            key={item.contentId}
            className={index !== 0 ? "-ml-[72px]" : ""}
            style={{ zIndex: total - index }}
          >
            <Note
              content={item.content}
              date={formatDate(item.createdAt)}
              size="sm"
              rotation={isOdd ? 'right' : 'left'}
              baseZIndex={total - index}
              bgImage={item.themeUrl ?? undefined}
            />
          </div>
        );
      })}
    </div>
  );
};
