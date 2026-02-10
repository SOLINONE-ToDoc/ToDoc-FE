import { FONTS, type FontId } from '@/shared/constants/fonts';
import { FONT_MAP } from "@/entities/font";

const loaded = new Set<FontId>();
const loadedFonts = new Set<number>();

export const fontLoader = {
  load(id: FontId) {
    if (loaded.has(id)) return;

    const font = FONTS[id];
    if (!font?.src) return;

    const style = document.createElement('style');
    style.setAttribute('data-font-id', id);
    style.innerHTML = `
      @font-face {
        font-family: '${font.fontFamily}';
        src: ${font.src};
        font-display: swap;
      }
    `;

    document.head.appendChild(style);
    loaded.add(id);
  },

  loadMany(ids: FontId[]) {
    ids.forEach((id) => this.load(id));
  },

  _loadAll() {
    (Object.keys(FONTS) as FontId[]).forEach((id) => this.load(id));
  },
};

export function loadFontById(fontId: number) {
  if (loadedFonts.has(fontId)) return;

  const font = FONT_MAP[fontId];
  if (!font || !font.url) return;

  if (font.url.endsWith('.css')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = font.url;
    document.head.appendChild(link);
  }
  else {
    const style = document.createElement('style');
    style.innerHTML = `
      @font-face {
        font-family: '${font.fontFamily}';
        src: url('${font.url}') format('woff2');
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }

  loadedFonts.add(fontId);
}

