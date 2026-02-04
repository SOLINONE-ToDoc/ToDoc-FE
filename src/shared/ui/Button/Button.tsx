import React from 'react';
import { cn } from '@/shared/lib/';

type ButtonSize = 'pill' | 'xl' | 'input' | 'text';
type ButtonVariant = 'primary' | 'secondary' | 'disabled' | 'outline' | 'text' | 'ghost';

const SIZES: Record<ButtonSize, string> = {
  pill: 'h-[41px] font-medium text-[14px] lg:text-[16px] rounded-full px-4',
  xl: 'h-[52px] font-medium text-body-1 lg:h-[80px] lg:text-[24px] rounded-[4px]',
  input: 'h-[44px] w-[76px] font-medium text-[12px] lg:text-[14px] lg:h-[56px] lg:w-[136px] rounded-[4px] shrink-0 whitespace-nowrap',
  text: 'text-[12px] lg:text-[14px] font-medium h-auto',
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-surface-primary text-content-onInverse',
  secondary: 'bg-surface-secondary text-content-primary',
  disabled: 'bg-surface-disabled text-content-onInverse hover:bg-surface-primary',
  outline: 'border border-line-default bg-transparent text-content-primary',
  text: 'bg-transparent text-content-secondary hover:underline',
  ghost: 'bg-surface-tertiary text-content-onInverse',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isValid?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'xl',
      variant = 'primary',
      fullWidth = false,
      className,
      disabled,
      textAlign = 'center',
      children,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center transition-all cursor-pointer hover:cursor-pointer',
          'gap-1 lg:gap-2',
          // 'disabled:cursor-not-allowed',
          size !== 'text' && 'active:scale-[0.98]',
          'focus:outline-none select-none',

          SIZES[size],
          VARIANTS[variant],

          {
            'justify-center text-center': textAlign === 'center',
          },

          fullWidth && size !== 'text' && 'w-full',
          className
        )}
        {...props}
      >
        {leftIcon && (
          <span className="flex items-center justify-center w-6 h-6 shrink-0">
            {leftIcon}
          </span>
        )}

        {children}

        {rightIcon && (
          <span className="flex items-center justify-center w-6 h-6 shrink-0">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
