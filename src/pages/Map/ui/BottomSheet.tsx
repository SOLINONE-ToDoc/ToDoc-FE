import { type ReactNode, useEffect, useRef } from 'react';

export type BottomSheetSnap = 'min' | 'mid' | 'max';

interface BottomSheetProps {
  children: ReactNode;
  snap: BottomSheetSnap;
  onSnapChange?: (snap: BottomSheetSnap) => void;
  heights?: Record<BottomSheetSnap, number>;
}

export const BottomSheet = ({
  children,
  snap,
  onSnapChange,
  heights = { min: 8, mid: 52, max: 88 },
}: BottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sheetRef.current) return;

    const height = heights[snap] ?? 10;
    sheetRef.current.style.height = `${height}vh`;
  }, [snap, heights]);

  return (
    <div
      ref={sheetRef}
      className="fixed bottom-0 left-0 right-0 z-[100] bg-white rounded-t-[20px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col"
    >
      <div className="w-full flex justify-center pt-2 cursor-pointer"
      onClick={() => {
          const nextSnap: BottomSheetSnap =
            snap === 'min' ? 'mid' : snap === 'mid' ? 'max' : 'min';
          onSnapChange?.(nextSnap);
        }}>
        <div className="w-[38px] h-[5px] bg-gray-300 rounded-full" />
      </div>
      {children}
    </div>
  );
};
