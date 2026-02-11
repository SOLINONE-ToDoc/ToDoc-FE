import React from 'react';
import { cn } from '@/shared/lib';

const SELECTED_OFFSET = 1000;
type NoteRotation = 'left' | 'right' | 'none';
type NoteSize = 'sm' | 'md' | 'lg' | 'xl';
const NOTE_SHADOW = '0 0 12px rgba(0, 0, 0, 0.06)';

const SIZES: Record<NoteSize, { container: string; content: string; date: string }> = {
  sm: {
    container: 'w-[168px] h-[228px] p-4 gap-[10px]',
    content: 'text-body-1 font-regular',
    date: 'text-[12px] font-medium',
  },
  md: {
    container: 'w-[184px] h-[248px] p-4 gap-[10px]',
    content: 'text-[18px] font-regular',
    date: 'text-[14px] font-medium',
  },
  lg: {
    container: 'w-[212px] h-[284px] p-5 gap-3',
    content: 'text-[20px] font-regular',
    date: 'text-[14px] font-medium',
  },
  xl: {
    container: 'w-[248px] h-[332px] p-6 gap-[14px]',
    content: 'text-[24px] font-regular',
    date: 'text-[16px] font-medium',
  },
};

const ROTATES: Record<NoteRotation, string> = {
  left: '-rotate-[4deg]',
  right: 'rotate-[4deg]',
  none: 'rotate-0',
};

interface NoteProps {
  content: string;
  date: string;
  size?: NoteSize;
  rotation?: NoteRotation;
  baseZIndex: number;
  isSelected?: boolean;
  bgImage?: string;
  className?: string;
  style?: React.CSSProperties;
  contentColor?: string;
  dateColor?: string;
  onClick?: () => void;
}

export const Note: React.FC<NoteProps> = ({
  content,
  date,
  size = 'sm',
  rotation = 'none',
  baseZIndex,
  isSelected = false,
  className,
  bgImage,
  style,
  contentColor = 'text-content-primary',
  dateColor = 'text-content-primary',
  onClick,
}) => {
  const styles = SIZES[size];
  const zIndex = isSelected ? baseZIndex + SELECTED_OFFSET : baseZIndex;
  const getDynamicFontStyle = (text: string): React.CSSProperties => {
    const len = text.length;
    const baseStyle: React.CSSProperties = { textAlign: 'center', width: '100%' };

    if (len === 1) return { ...baseStyle, fontSize: '128px', lineHeight: '1' };
    if (len === 2) return { ...baseStyle, fontSize: '88px', lineHeight: '1' };
    if (len === 3) return { ...baseStyle, fontSize: '56px', lineHeight: '1.2' };
    if (len === 4) return { ...baseStyle, fontSize: '52px', lineHeight: '1.2' };
    if (len >= 5 && len <= 9) return { ...baseStyle, fontSize: '40px', lineHeight: '1.3' };

    return baseStyle;
  };

  const dynamicStyle = getDynamicFontStyle(content);
  const isLargeText = content.length < 10;

  return (
    <div
      onClick={onClick}
      style={{
        ...style,
        zIndex,
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        boxShadow: NOTE_SHADOW,
      }}
      className={cn(
        'flex flex-col justify-between select-none cursor-pointer transition-all will-change-transform transition-transform duration-300 bg-white border border-gray-200',
        styles.container,
        ROTATES[rotation],
        isSelected && 'scale-[1.03] brightness-95',
        className
      )}
    >
      <div className="flex-1 flex items-center justify-center overflow-hidden text-center">
        <p
          className={cn(
            contentColor,
            !isLargeText && styles.content,
            'break-words w-full text-center'
          )}
          style={dynamicStyle}
        >
          {content.slice(0, 60)}
        </p>
      </div>

      <span className={cn(dateColor, styles.date, 'text-center')}>
        {date}
      </span>
    </div>
  );
};
