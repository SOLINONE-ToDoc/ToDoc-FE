import { useParams, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { NoteGrid } from '@/widgets/Note';
import { cn } from '@/shared/lib';
import { useVisitorBoard } from '@/entities/board';
import { usePlaceStore } from '@/entities/place';
import { WriteButton } from './WriteButton';
import { PlaceTag } from './PlaceTag';
import { useFontPreload } from '@/shared/hooks';
import type { BoardContent } from '@/entities/board';
import { Note } from '@/shared/ui/Note';
import { FONT_MAP } from '@/entities/font';
import { ICON_BOOST, ICON_SHARE, ICON_LOCATION } from '../assets/icons';
import { boostContent } from '@/features/board';
import { Toast } from '@/shared/ui/Toast';
import { useLocationStore } from '@/entities/map';
import { useAuthStore } from '@/entities/auth';
import { useMyNoteInPlace } from '@/features/board';

export const VisitorView = () => {
  const navigate = useNavigate();
  const { placeId } = useParams<{ placeId: string }>();
  const { setLastSelectedPlaceId } = usePlaceStore();
  const { userInfo } = useAuthStore();
  const { coords } = useLocationStore();
  const { hasMyNote } = useMyNoteInPlace();
  const [selectedNote, setSelectedNote] = useState<BoardContent | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const checkAuth = () => {
    if (!userInfo) {
      setToastMessage('로그인이 필요한 서비스예요');
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (placeId) {
      setLastSelectedPlaceId(Number(placeId));
    }
  }, [placeId, setLastSelectedPlaceId]);

  const { contents, placeName } = useVisitorBoard(Number(placeId));

  const fontIds = contents.map((c) => c.fontId);
  useFontPreload(fontIds);

  const handleWriteNavigation = () => {
    if (placeId) {
      navigate(`/place/${placeId}/write`);
    }
  };

  useEffect(() => {
    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      width: document.body.style.width,
      height: document.body.style.height,
      overscrollBehavior: document.body.style.overscrollBehavior,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.position = originalStyle.position;
      document.body.style.width = originalStyle.width;
      document.body.style.height = originalStyle.height;
      document.body.style.overscrollBehavior = originalStyle.overscrollBehavior;
      document.documentElement.style.overscrollBehavior = 'auto';
    };
  }, []);

  const handleMyNote = () => {
    // 내 보드 찾는거 만들어야함
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [constraints, setConstraints] = useState<{ left: number; right: number; top: number; bottom: number } | false>(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const calculateBounds = () => {
      const containerRect = containerRef.current!.getBoundingClientRect();
      const canvasRect = canvasRef.current!.getBoundingClientRect();

      let newConstraints: { left: number; right: number; top: number; bottom: number } | false = false;

      if (canvasRect.width > containerRect.width || canvasRect.height > containerRect.height) {
        let left = 0;
        let right = 0;
        let top = 0;
        let bottom = 0;

        if (canvasRect.width > containerRect.width) {
          left = -(canvasRect.width - containerRect.width);
          right = 0;
        }

        if (canvasRect.height > containerRect.height) {
          top = -(canvasRect.height - containerRect.height);
          bottom = 0;
        }

        newConstraints = { left, right, top, bottom };
      }

      setConstraints(newConstraints);

      if (canvasRect.width > 0 && canvasRect.height > 0) {
        x.set(-(canvasRect.width - containerRect.width) / 2);
        y.set(-(canvasRect.height - containerRect.height) / 2);
      }
    };

    calculateBounds();
    const observer = new ResizeObserver(calculateBounds);
    observer.observe(canvasRef.current);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [contents.length, x, y]);

  const handleBoost = async () => {
    if (!checkAuth()) return;
    if (!placeId || !selectedNote) return;

    if (!coords) {
      setToastMessage("위치 정보를 가져올 수 없습니다.");
      return;
    }
    const isMine = await hasMyNote(
      Number(placeId),
      selectedNote.contentId
    );

    if (!isMine) {
      setToastMessage('본인의 방명록만 끌어올릴 수 있어요');
      return;
    }

    const payload = {
      contentId: selectedNote.contentId,
      userLatitude: coords.lat,
      userLongitude: coords.lng
    };

    const isSuccess = await boostContent(Number(placeId), payload);

    if (isSuccess) {
      setToastMessage('방명록을 끌어올렸어요');
    } else {
      setToastMessage('방명록을 끌어올리지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleShare = () => {
    if (!checkAuth()) return;

    navigator.clipboard.writeText(window.location.href).then(() => {
      setToastMessage('링크가 복사되었어요');
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-hidden bg-[#F9F9F9] relative"
    >
      <motion.div
        ref={canvasRef}
        drag={constraints !== false}
        dragConstraints={constraints !== false ? constraints : undefined}
        dragElastic={0.2}
        dragMomentum
        dragTransition={{ power: 0.2, timeConstant: 200 }}
        style={{ x, y }}
        className={cn(
          "w-fit will-change-transform p-[100px] cursor-grab active:cursor-grabbing"
        )}
      >
        <NoteGrid contents={contents} onNoteClick={setSelectedNote} />
      </motion.div>
      {selectedNote && (
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-surface-overlay"
            onClick={() => setSelectedNote(null)}
          />

          <div className="relative z-10 w-full flex flex-col items-center">
            <div className='flex items-center justify-center h-[40px] px-3 mb-10 gap-1 rounded-full bg-black/50 select-none'>
              <ICON_LOCATION width={24} height={24} className='text-white' />
              <span className='text-body-2 font-regular text-content-onInverse'>
                {placeName}
              </span>
            </div>
            <Note
              size="lg"
              rotation="none"
              content={selectedNote.content}
              date={(selectedNote.createdAt)}
              baseZIndex={50}
              bgImage={selectedNote.themeUrl || undefined}
              style={{
                fontFamily: FONT_MAP[selectedNote.fontId]?.fontFamily,
              }}
            />
            <div className='flex flex-row gap-2 pointer-events-auto mt-[72px]'>
              <button
                className="flex flex-col w-[144px] h-[77px] items-center justify-center bg-black text-white rounded-[12px] pt-3 pb-4 gap-2 transition-active active:scale-95"
                onClick={handleShare}
              >
                <ICON_SHARE width={28} height={28} />
                <span className="text-body-2 font-medium">공유하기</span>
              </button>
              <button
                className="flex flex-col w-[144px] h-[77px] items-center justify-center bg-red-400 text-white rounded-[12px] pt-3 pb-4 gap-2 transition-active active:scale-95"
                onClick={handleBoost}
              >
                <ICON_BOOST width={28} height={28} />
                <span className="text-body-2 font-medium text-center">방명록 끌어올리기</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
          className="z-[11000]"
        />
      )}

      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {!selectedNote && (
          <div className="absolute left-[24px] bottom-[32px] pointer-events-auto">
            <PlaceTag placeName={placeName} />
          </div>
        )}
        <div className="absolute right-[24px] bottom-[24px] pointer-events-auto">
          <WriteButton
            onWriteClick={handleWriteNavigation}
            onSearchMyNoteClick={handleMyNote}
          />
        </div>
      </div>
    </div>
  );
};
