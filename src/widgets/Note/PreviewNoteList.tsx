import { Note } from '@/shared/ui/Note';
import { formatDate } from '@/shared/utils';

interface PreviewNoteListProps {
  themeUrls: string[];
  count?: number;
}

export const PreviewNoteList = ({ themeUrls }: PreviewNoteListProps) => {
  const dummyText = "토독 서비스 입니다. 방명록을 남겨주세요. 감사합니다!";
  const todayWithTime = formatDate(new Date());

  const notes = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    content: dummyText,
    date: todayWithTime,
    themeUrl: themeUrls[i % themeUrls.length]
  }));

  return (
    <div className="flex items-center justify-center p-10 overflow-x-auto scrollbar-hide w-full">
      <div className="flex">
        {notes.map((note, index) => {
          const rotation = index % 2 === 0 ? 'right' : 'left';
          return (
            <div
              key={note.id}
              style={{ zIndex: notes.length - index }}
            >
              <Note
                content={note.content}
                date={note.date}
                size="md"
                rotation={rotation}
                baseZIndex={notes.length - index}
                bgImage={note.themeUrl}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
