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
          100: '#e9e9e9',
          200: '#d9d9d9',
          300: '#bdbdbd',
          400: '#8b8b8b',
          500: '#606060',
          600: '#404040',
        },

        surface: {
          base: '#ffffff',
          surface: '#f6f6f6',
          primary: '#000000',
          secondary: '#e9e9e9',
          tooltip: '#404040',
          input: '#ffffff',
          overlay: 'rgba(0,0,0,0.7)'
        },

        content: {
          primary: '#000000',
          secondaryMain: '#000000',
          secondarySub: '#606060',
          muted: '#8b8b8b',

          navActive: '#000000',
          navInactive: '#8b8b8b',

          placeholder: '#d9d9d9',

          onPrimary: '#000000',
          onOverlay: '#FFFFFF',

          success: '#40a6eb',
          error: '#ff6666',
          warning: '#ff6666',
        },

        line: {
          default: '#e9e9e9',
          strong: '#d9d9d9',
        },
      },

      fontFamily: tailwindFontFamily,
    },
  },
  plugins: [],
}
