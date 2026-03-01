import { FONT_MAP } from "@/entities/font";

const loadedFonts = new Set<number>();
const loadingPromises = new Map<number, Promise<void>>();

export function loadFontById(fontId: number): Promise<void> {
  if (loadedFonts.has(fontId)) {
    return Promise.resolve();
  }
  if (loadingPromises.has(fontId)) {
    return loadingPromises.get(fontId)!;
  }

  const font = FONT_MAP[fontId];
  if (!font || !font.url) {
    loadedFonts.add(fontId);
    return Promise.resolve();
  }

  const loadPromise = new Promise<void>((resolve, reject) => {
    if (font.url!.endsWith(".css")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = font.url!;
      link.onload = () => {
        if (document.fonts && document.fonts.load) {
          document.fonts
            .load(`1em "${font.fontFamily}"`)
            .then(() => {
              loadedFonts.add(fontId);
              loadingPromises.delete(fontId);
              resolve();
            })
            .catch(reject);
        } else {
          loadedFonts.add(fontId);
          loadingPromises.delete(fontId);
          resolve();
        }
      };
      link.onerror = () => {
        loadingPromises.delete(fontId);
        reject(new Error(`Failed to load CSS font: ${font.url}`));
      };
      document.head.appendChild(link);
    } else {
      const style = document.createElement("style");
      style.innerHTML = `
        @font-face {
          font-family: '${font.fontFamily}';
          src: url('${font.url}') format('woff2');
          font-display: swap;
        }
      `;
      document.head.appendChild(style);

      if (document.fonts && document.fonts.load) {
        document.fonts
          .load(`1em "${font.fontFamily}"`)
          .then(() => {
            loadedFonts.add(fontId);
            loadingPromises.delete(fontId);
            resolve();
          })
          .catch(reject);
      } else {
        console.warn(
          "Font Loading API not supported, font load status might be inaccurate.",
        );
        loadedFonts.add(fontId);
        loadingPromises.delete(fontId);
        resolve();
      }
    }
  });

  loadingPromises.set(fontId, loadPromise);
  return loadPromise;
}
