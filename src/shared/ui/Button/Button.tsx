import React from 'react';
import { cn } from '@/shared/lib/';

type ButtonSize = 'sPill' | 'pill' | 'lPill' | 'xl' | 'input' | 'text' ;
type ButtonVariant = 'primary' | 'inversePrimary' | 'secondary' | 'disabled' | 'outline' | 'text' | 'emphasize' | 'ghost' | 'plain';

const SIZES: Record<ButtonSize, string> = {
  sPill: 'h-8 font-medium text-[14px] rounded-full px-4',
  pill: 'h-[40px] font-medium text-[14px] lg:text-[16px] rounded-full px-4',
  lPill: 'h-[44px] px-4 font-medium text-[16px] rounded-full',
  xl: 'h-[52px] font-medium text-body-1 lg:h-[80px] lg:text-[24px] rounded-[4px]',
  input: 'h-[44px] w-[76px] font-medium text-[12px] lg:text-[14px] lg:h-[56px] lg:w-[136px] rounded-[4px] shrink-0 whitespace-nowrap',
  text: 'text-[12px] lg:text-[14px] font-medium h-auto',
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-surface-primary text-content-onInverse',
  inversePrimary: 'bg-surface-base',
  secondary: 'bg-surface-secondary text-content-primary',
  disabled: 'bg-surface-disabled text-content-onInverse hover:bg-surface-primary',
  outline: 'border border-line-default bg-transparent text-content-primary',
  text: 'bg-transparent text-content-secondary hover:underline',
  plain: 'bg-transparent text-content-primary',
  emphasize: 'bg-red-100 text-red-400 hover:bg-red-400 hover:text-content-onInverse',
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
