/** @type {import('tailwindcss').Config} */
import { FONTS } from './src/shared/constants/fonts';

const tailwindFontFamily = Object.values(FONTS).reduce((acc, font) => {
  const key = font.tailwindClass.replace('font-', '');
  acc[key] = [font.fontFamily, 'sans-serif'];
  return acc;
}, {});

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'gentle-pulse': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.3' },
        },
        'scan-with-hold': {
          '0%': { transform: 'translateY(-20px)' },
          '45%, 55%': { transform: 'translateY(65px)' },
          '100%': { transform: 'translateY(-20px)' },
        },
        'shadow-flip': {
          '0%, 10%': { opacity: '0' },
          '15%, 40%': {
            transform: 'scaleY(1) translateY(-15px)',
            opacity: '1'
          },
          '45%, 55%': { opacity: '0' },
          '60%, 85%': {
            transform: 'scaleY(-1) translateY(44px)',
            opacity: '1'
          },
          '90%, 100%': { opacity: '0' }
        }
      },
      animation: {
        'gentle-pulse': 'gentle-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-with-hold': 'scan-with-hold 4s ease-in-out infinite',
        'shadow-flip': 'shadow-flip 4s ease-in-out infinite',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(45deg, #ff5546 1%, #9747ff 50%, #ff5546 100%)',
      },

      colors: {
        white: '#ffffff',
        black: '#000000',

        gray: {
          100: '#f6f6f6',
          200: '#e9e9e9',
          300: '#d9d9d9',
          400: '#8b8b8b',
          500: '#606060',
          600: '#404040',
        },

        red: {
          100: '#FFE8E5',
          200: '#FFD0CC',
          300: '#FFA199',
          400: '#FF5546',
        },

        surface: {
          base: '#ffffff',
          primary: '#000000',
          secondary: '#e9e9e9',
          tertiary: '#404040',
          disabled: '#8b8b8b',

          input: {
            default: '#ffffff',
            hover: '#e9e9e9',
          },
          overlay: 'rgba(0,0,0,0.7)'
        },

        content: {
          primary: '#000000',
          secondary: '#d9d9d9',
          muted: '#8b8b8b',

          navActive: '#000000',
          navInactive: '#8b8b8b',

          placeholder: '#d9d9d9',

          onPrimary: '#000000',
          onInverse: '#ffffff',
          onOverlay: '#FFFFFF',

          success: '#40a6eb',
          error: '#ff6666',
          warning: '#ff6666',
        },

        line: {
          default: '#d9d9d9',
          input: {
            default: '#d9d9d9',
            hover: '#000000',
            focused: '#000000',
          }
        },
      },

      fontWeight: {
        'regular': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },

      fontSize: {
        'hero-1': ['84px', { lineHeight: '100px' }],
        'hero-2': ['64px', { lineHeight: 'normal' }],
        'hero-3': ['32px', { lineHeight: 'normal' }],
        'title': ['24px', { lineHeight: 'normal' }],
        'heading-1': ['18px', { lineHeight: 'normal' }],
        'body-1': ['16px', { lineHeight: '22px' }],
        'body-2': ['14px', { lineHeight: 'normal' }],
        'caption': ['12px', { lineHeight: '16px' }],
      },

      fontFamily: tailwindFontFamily,
    },
  },
  plugins: [],
}
