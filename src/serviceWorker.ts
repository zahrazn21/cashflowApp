import { Workbox } from 'workbox-window';

export function registerSW() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        if (confirm('New version available. Refresh?')) {
          window.location.reload();
        }
      }
    });

    wb.register();
  }
}
