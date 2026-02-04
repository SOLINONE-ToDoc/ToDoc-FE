import React, { useState, useMemo, useCallback } from 'react';
import { cn } from '@/shared/lib';
import { ICONS } from '@/shared/constants';

interface CalendarProps {
  value?: string;
  onSelect: (date: string) => void;
  onClose?: () => void;
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const padZero = (num: number) => num.toString().padStart(2, '0');

export const Calendar: React.FC<CalendarProps> = React.memo(({ value, onSelect, onClose }) => {
  const today = useMemo(() => new Date(), []);

  const initialDate = useMemo(() => {
    return value && value !== ''
      ? new Date(value.replace(/\./g, '-'))
      : today;
  }, [value, today]);

  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(initialDate.getDate());
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);

  const years = useMemo(() => {
    const currentYear = today.getFullYear();
    const startYear = 1950;
    return Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => currentYear - i
    );
  }, [today]);

  const { daysArray, firstDayOfMonth } = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    return {
      daysArray: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      firstDayOfMonth: new Date(year, month, 1).getDay()
    };
  }, [year, month]);

  const handlePrevMonth = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (month === 0) {
      setYear(prev => prev - 1);
      setMonth(11);
    } else {
      setMonth(prev => prev - 1);
    }
  }, [month]);

  const handleNextMonth = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (month === 11) {
      setYear(prev => prev + 1);
      setMonth(0);
    } else {
      setMonth(prev => prev + 1);
    }
  }, [month]);

  const handleSelectDay = (day: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDay(day);
    const formatted = `${year}.${padZero(month + 1)}.${padZero(day)}`;
    onSelect(formatted);
  };

  const handleYearSelect = (y: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setYear(y);
    setIsYearPickerOpen(false);
  };

  const isToday = useCallback(
    (day: number) => {
      const now = today;
      return (
        year === now.getFullYear() &&
        month === now.getMonth() &&
        day === now.getDate()
      );
    },
    [year, month, today]
  );

  return (
    <div
      className="absolute top-full right-0 mt-2 z-50 bg-white border rounded-lg p-4 shadow-xl min-w-[280px]"
      onClick={(e) => e.stopPropagation()}
    >
      {isYearPickerOpen ? (
        <div className="flex flex-col h-[280px]">
          <div className="text-center font-bold mb-4 border-b pb-2">연도 선택</div>
          <div className="grid grid-cols-3 gap-2 overflow-y-auto pr-1 flex-1 custom-scrollbar">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                className={`py-2 text-body-2 rounded transition-colors ${
                  y === year ? 'bg-surface-primary text-white font-bold' : 'hover:bg-surface-secondary'
                }`}
                onClick={(e) => handleYearSelect(y, e)}
              >
                {y}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 w-full py-2 bg-gray-100 rounded text-caption font-medium hover:bg-gray-200"
            onClick={(e) => { e.stopPropagation(); setIsYearPickerOpen(false); }}
          >
            취소
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4 text-body-1 font-semibold">
            <button
              type="button"
              className="p-1 hover:bg-gray-100 rounded transition-colors flex items-center justify-center"
              onClick={handlePrevMonth}
            >
              <ICONS.Back className="w-4 h-4 [&_path]:stroke-[2px]" />
            </button>
            <span
              className="cursor-pointer transition-colors underline underline-offset-4"
              onClick={(e) => { e.stopPropagation(); setIsYearPickerOpen(true); }}
            >
              {year}년 {month + 1}월
            </span>
            <button
              type="button"
              className="p-1 hover:bg-gray-100 rounded transition-colors flex items-center justify-center"
              onClick={handleNextMonth}
            >
              <ICONS.Next className="w-4 h-4 [&_path]:stroke-[2px]" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-[2px] text-center text-body-2 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
              <div key={d} className="font-semibold text-gray-400 py-1">{d}</div>
            ))}

            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={'empty-' + i} className="p-2"></div>
            ))}

            {daysArray.map((day) => (
              <button
                key={day}
                type="button"
                className={cn(
                  'text-body-2 w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-95',

                  day === selectedDay && 'bg-surface-primary text-white font-bold',

                  isToday(day) && day !== selectedDay && 'underline underline-offset-4 decoration-2 decoration-black font-bold text-black',

                  day !== selectedDay && 'hover:bg-surface-secondary'
                )}
                onClick={(e) => handleSelectDay(day, e)}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="flex justify-end mt-2 border-t pt-3">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onClose?.(); }}
              className="px-4 py-2 bg-gray-100 rounded text-caption font-medium hover:bg-gray-200"
            >
              완료
            </button>
          </div>
        </>
      )}
    </div>
  );
});

Calendar.displayName = 'Calendar';
