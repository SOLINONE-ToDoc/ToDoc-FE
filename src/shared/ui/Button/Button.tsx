import React from 'react';
import { cn } from '@/shared/lib/';

type ButtonSize = 'pill' | 'xl' | 'text';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

const SIZES: Record<ButtonSize, string> = {
  pill: 'h-[41px] font-medium text-[14px] lg:text-[16px] rounded-full px-4',
  xl: 'h-[52px] font-medium text-body-1 lg:h-[80px] lg:text-[24px] rounded-[4px]',
  text: 'text-[12px] lg:text-[14px] font-medium h-auto',
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-surface-primary text-content-onInverse',
  secondary: 'bg-surface-secondary text-content-primary',
  outline: 'border border-line-default bg-transparent text-content-primary',
  text: 'bg-transparent text-content-secondary hover:underline',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  textAlign?: 'left' | 'center' | 'right';
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
          'disabled:cursor-not-allowed',
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
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
