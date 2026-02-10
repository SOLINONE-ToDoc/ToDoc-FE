export function loadWebFont(linkHref: string): Promise<void> {
  return new Promise((resolve, reject) => {

    if (document.querySelector(`link[href="${linkHref}"]`)) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = linkHref;
    link.charset = 'utf-8';
    link.referrerPolicy = 'origin';

    link.onload = () => resolve();
    link.onerror = (e) => reject(e);

    document.head.appendChild(link);
  });
}
