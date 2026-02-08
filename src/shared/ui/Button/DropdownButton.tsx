import React, { useState } from 'react';
import { ICONS } from '@/shared/constants';
import { cn } from '@/shared/lib';

interface DropdownButtonProps {
  label: string;
  options: string[];
  className?: string;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({ label, options, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="inline-flex items-center justify-between w-full px-4 text-left text-[16px] font-semibold"
      >
        <span className="block overflow-hidden whitespace-nowrap text-ellipsis">
          {label}
        </span>
        <span
          className={cn(
            'ml-2 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        >
          {isOpen ? <ICONS.Down  /> : <ICONS.Down />}
        </span>
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-line-200 rounded-[4px] z-50">
          {options.map((option, idx) => (
            <li
              key={idx}
              className="px-4 py-3 text-body-2 font-medium hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                console.log('선택됨:', option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
