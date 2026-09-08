const CACHE_NAME = 'tcu-study-os-pwa-v11-2-2-fast-load';
const APP_SHELL = [
  './', './index.html', './styles.css', './app.js', './theme-tcu-blue-gold.js', './manifest.webmanifest'
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
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
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
    const response = await fetch(request, { cache: 'no-store', signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Navegação: tenta rede rapidamente; se GitHub Pages/Safari estiver lento,
  // abre imediatamente a cópia local já conhecida.
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await networkWithTimeout(event.request, 3500);
        return put(event.request, response);
      } catch {
        return (await cached(event.request)) || (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  // Arquivos estáticos: cache-first para abertura instantânea; atualiza em segundo plano.
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
