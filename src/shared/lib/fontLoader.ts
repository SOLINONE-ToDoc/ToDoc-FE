import { FONT_MAP } from "@/entities/font";

const loadedFonts = new Set<number>();

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

