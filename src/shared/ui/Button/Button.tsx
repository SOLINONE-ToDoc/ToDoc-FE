import React from 'react';
import { cn } from '@/shared/lib/';

type ButtonSize = 'xl';
type ButtonVariant = 'primary' | 'secondary';

const SIZES: Record<ButtonSize, string> = {
  xl: 'h-[52px] font-medium text-body-1 lg:h-[80px] lg:text-[24px] rounded-[4px]',
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-surface-primary text-content-onInverse',
  secondary: 'bg-surface-secondary text-content-primary',
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
          'inline-flex items-center font-medium transition-all',
          'active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-surface-primary/50',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',

          SIZES[size],
          VARIANTS[variant],

          {
            'justify-center text-center': textAlign === 'center',
          },

          fullWidth && 'w-full',
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
