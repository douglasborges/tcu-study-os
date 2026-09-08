const CACHE_NAME = 'tcu-study-os-pwa-v11-3-1-oauth-favicon';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './drive-sync.css',
  './app.js',
  './theme-tcu-blue-gold.js',
  './oauth-client-hotfix-v11.3.1.js',
  './drive-sync.js',
  './assets/icons/favicon-v11-blue-gold.svg',
  './manifest.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .catch(() => null)
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

async function cached(request) {
  return caches.match(request, { ignoreSearch: true });
}

async function put(request, response) {
  if (!response || !response.ok) return response;
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone()).catch(() => null);
  return response;
}

async function networkWithTimeout(request, timeoutMs = 3500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(request, { cache: 'no-store', signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // OAuth e Google Drive permanecem fora do Service Worker.
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await networkWithTimeout(event.request, 3500);
        return put(event.request, response);
      } catch {
        return (await cached(event.request)) ||
          (await caches.match('./index.html')) ||
          Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const hit = await cached(event.request);
    if (hit) {
      event.waitUntil(
        fetch(event.request, { cache: 'no-store' })
          .then(response => put(event.request, response))
          .catch(() => null)
      );
      return hit;
    }

    try {
      const response = await fetch(event.request, { cache: 'no-store' });
      return put(event.request, response);
    } catch {
      return Response.error();
    }
  })());
});
