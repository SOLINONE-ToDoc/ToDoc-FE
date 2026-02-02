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

        surface: {
          base: '#ffffff',
          primary: '#000000',
          secondary: '#e9e9e9',

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
