import { Note } from '@/shared/ui/Note';
import { formatDate } from '@/shared/utils';
import type { BrifContent } from '@/entities/board';
import { cn } from '@/shared/lib';

interface MyNoteListProps {
  contents: BrifContent[];
  isLoading: boolean;
}

export const MyNoteList = ({ contents, isLoading }: MyNoteListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}/>
        ))}
      </div>
    );
  }

  if (contents.length === 0) {
    return (
      <>
        <div className="text-heading-1 font-semibold">
          작성한 방명록이 없어요
        </div>
        <div className="text-gray-400 text-body-2 font-regular">
          방명록이 있는 매장에 내 기록을 남겨보세요
        </div>
      </>
    );
  }

  return (
    <div className={cn(
      "grid gap-x-4 gap-y-4 justify-items-center w-full",
      "grid-cols-2",
      "min-[576px]:grid-cols-3",
      "min-[760px]:grid-cols-4",
      "min-[944px]:grid-cols-5",
    )}>
      {contents.map((note) => (
        <div key={note.contentId} className="w-[168px]">
          <Note
            content={note.content}
            date={formatDate(note.createdAt)}
            size="sm"
            baseZIndex={10}
            bgImage={note.themeUrl === "string" ? undefined : note.themeUrl}
          />
        </div>
      ))}
    </div>
  );
};
