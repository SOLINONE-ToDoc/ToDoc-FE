import React from 'react';
import { cn } from '@/shared/lib';
import { ICONS } from '@/shared/constants';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  fullWidth?: boolean;
  error?: boolean;
  allowToggle?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelClassName,
      type = 'text',
      fullWidth = true,
      allowToggle = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && allowToggle ? (visible ? 'text' : 'password') : type;

    return (
      <div className={cn('flex flex-col gap-3', fullWidth && 'w-full')}>

        {label && (
          <label className={cn('text-content-primary font-semibold transition-all', labelClassName)}>
            {label}
          </label>
        )}

        <div className={cn('relative', fullWidth && 'w-full')}>
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={cn(
              'peer w-full outline-none transition-colors rounded-[4px]',
              'h-[44px] px-[14px] text-body-2 font-regular lg:h-[56px] lg:px-[20px] lg:text-[16px]',
              'bg-surface-input-default text-content-primary placeholder:text-content-placeholder placeholder:text-body-2 lg:placeholder:text-[16px]',
              'border border-line-input-default hover:border-line-input-hover focus:border-line-input-focused',
              isPassword && allowToggle && 'pr-12',
              className
            )}
            {...props}
          />

          {isPassword && allowToggle && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setVisible(v => !v)}
              className={cn(
                'absolute right-4 lg:right-5 top-1/2 -translate-y-1/2 transition-colors',
                'outline-none focus:outline-none',
                'text-content-placeholder peer-hover:text-content-primary peer-focus:text-content-primary'
              )}
            >
              {visible ? (
                <ICONS.EyeOff className="stroke-current" width={24} height={24} />
              ) : (
                <ICONS.Eye className="stroke-current" width={24} height={24} />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
