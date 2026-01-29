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
      },

      fontFamily: tailwindFontFamily,
    },
  },
  plugins: [],
}
