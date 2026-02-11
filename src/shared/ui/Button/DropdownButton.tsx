import React, { useState } from 'react';
import { ICONS } from '@/shared/constants';
import { cn } from '@/shared/lib';

interface DropdownButtonProps {
  label: string;
  options: string[];
  onSelect?: (option: string) => void;
  className?: string;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  options,
  onSelect,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('relative inline-block text-left', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="inline-flex items-center justify-between w-full px-4 text-left text-[16px] font-semibold"
      >
        <span className="block overflow-hidden whitespace-nowrap text-ellipsis ">
          {label}
        </span>

        <span
          className={cn(
            'ml-2 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        >
          <ICONS.Down />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute left-3 mt-2 w-[208px] bg-white border border-line-200 rounded-[4px] overflow-hidden z-50">
          {options.map((option, idx) => {
            const isAddOption = option === '추가하기';

            let itemClassName =
              'px-4 py-3 text-[14px] font-medium cursor-pointer transition-colors flex items-center justify-between';

            if (isAddOption) {
              itemClassName += ' text-primary border-t border-line-100 hover:bg-primary/5';
            } else {
              itemClassName += ' text-content-default hover:bg-gray-100';
            }

            const handleClick = () => {
              onSelect?.(option);
              setIsOpen(false);
            };

            return (
              <li
                key={idx}
                className={itemClassName}
                onClick={handleClick}
              >
                <span className="truncate mr-2">{option}</span>
                {isAddOption && <ICONS.Plus className="w-4 h-4"/>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
