const CACHE_NAME = 'tcu-study-os-pwa-v11-2-drive-sync';
const APP_SHELL = [
  './', './index.html', './styles.css', './drive-sync.css', './app.js', './theme-tcu-blue-gold.js', './drive-sync.js', './manifest.webmanifest',
  './assets/icons/logo-v11-azul-dourado.png', './assets/icons/icon-192.png', './assets/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

// Network-first evita que o app fique preso em uma versão antiga no GitHub Pages.
// Se estiver offline, usa o cache local.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.mode === 'navigate') return caches.match('./index.html');
        throw new Error('Offline e recurso não encontrado no cache.');
      })
  );
});
