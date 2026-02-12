import { useState } from 'react';
import { ICONS } from '@/shared/constants';
import { Button } from '@/shared/ui/Button';

interface WriteButtonProps {
  onWriteClick: () => void;
  onSearchMyNoteClick: () => void;
}

export const WriteButton = ({ onWriteClick, onSearchMyNoteClick }: WriteButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-surface-overlay z-[9998] transition-opacity animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div
          className="fixed right-[24px] bottom-[96px] z-[9999] animate-in slide-in-from-bottom-2 fade-in duration-200"
        >
          <div
            className="flex flex-col items-start justify-start bg-white pl-5 pr-6 py-4 gap-2 rounded-[16px] shadow-[0px_8px_20px_rgba(0,0,0,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              type="button"
              size="text"
              variant="plain"
              leftIcon={<ICONS.Pencil />}
              onClick={() => {
                onWriteClick();
                setIsOpen(false);
              }}
              className="flex items-center justify-start gap-2 text-left w-full text-body-1 font-regular pb-1"
            >
              방명록 작성하기
            </Button>
            <Button
              type="button"
              size="text"
              variant="plain"
              leftIcon={<ICONS.Search />}
              onClick={() => {
                onSearchMyNoteClick();
                setIsOpen(false);
              }}
              className="flex items-center justify-start gap-2 text-left w-full text-body-1 font-regular pt-1"
            >
              내 방명록 찾기
            </Button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={`fixed right-[24px] bottom-[24px] z-[10000] w-[56px] h-[56px] rounded-full flex items-center justify-center transition-transform active:scale-95 ${isOpen ? 'rotate-45 bg-white' : 'bg-red-400'}`}
      >
        <ICONS.Plus
          className={`
            w-8 h-8 transition-colors duration-300
            ${isOpen ? 'text-black' : 'text-white'}
          `}
        />
      </button>
    </>
  );
};
