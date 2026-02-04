import React from 'react';
import { cn } from '@/shared/lib';
import { ICONS } from '@/shared/constants';

type InputIconType = 'passwordToggle' | 'refresh' | 'search';
export type HelperStatus = 'error' | 'success' | 'default';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  fullWidth?: boolean;
  helperText?: string;
  helperStatus?: HelperStatus;
  iconType?: InputIconType;
  onIconClick?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelClassName,
      type = 'text',
      fullWidth = true,
      helperStatus,
      helperText,
      iconType,
      onIconClick,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(false);
    const isPassword = type === 'password';
    const inputType =
      isPassword && iconType === 'passwordToggle'
        ? visible
          ? 'text'
          : 'password'
        : type;

    const renderIcon = () => {
      if (!iconType) return null;

      switch (iconType) {
        case 'passwordToggle':
          return visible ? (
            <ICONS.EyeOff className="stroke-current" width={24} height={24} />
          ) : (
            <ICONS.Eye className="stroke-current" width={24} height={24} />
          );
        case 'refresh':
          return <ICONS.Refresh className="stroke-current" width={24} height={24} />;
        case 'search':
          return <ICONS.Search className="stroke-current" width={24} height={24} />;
        default:
          return null;
      }
    };

    const handleIconClick = () => {
      if (iconType === 'passwordToggle') setVisible(v => !v);
      else onIconClick?.();
    };

    let HelperIcon = ICONS.Alert;

    if (helperStatus === 'success') {
      HelperIcon = ICONS.Accepted;
    }

    return (
      <div className={cn('flex flex-col gap-3', fullWidth && 'w-full')}>
        {label && (
          <label className={cn('text-content-primary font-semibold transition-all', labelClassName)}>
            {label}
          </label>
        )}

        <div className="flex flex-col">
          <div className={cn('relative group', fullWidth && 'w-full')}>
            <input
              ref={ref}
              type={inputType}
              disabled={disabled}
              className={cn(
                'peer w-full outline-none transition-colors rounded-[4px]',
                'h-[44px] px-[14px] text-[14px] font-regular lg:h-[56px] lg:px-[20px] lg:text-[16px]',
                'bg-surface-input-default text-content-primary placeholder:text-content-placeholder placeholder:text-body-2 lg:placeholder:text-[16px]',
                'border border-line-input-default group-hover:border-line-input-hover group-focus:border-line-input-focused',
                iconType && 'pr-12',
                className
              )}
              {...props}
            />

            {iconType && !disabled && (
              <button
                type="button"
                tabIndex={-1}
                onClick={handleIconClick}
                className={cn(
                  'absolute right-4 lg:right-5 top-1/2 -translate-y-1/2 transition-colors',
                  'outline-none focus:outline-none',
                  'text-content-placeholder group-hover:text-content-primary',
                )}
              >
                {renderIcon()}
              </button>
            )}
          </div>

          {helperText && (
            <div
              className={cn(
                'flex items-center text-medium text-[12px] lg:text-[14px] mt-1 lg:mt-3',
                helperStatus === 'error' && 'text-content-error',
                helperStatus === 'success' && 'text-content-success',
                helperStatus === 'default' && 'text-content-muted'
              )}
              >
              <HelperIcon
                width={24}
                height={24}
                className="shrink-0 scale-75 lg:scale-100 stroke-current"
              />
              <span>{helperText}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
