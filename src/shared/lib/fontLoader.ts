import { FONTS, type FontId } from '@/shared/constants/fonts';

const loaded = new Set<FontId>();

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
