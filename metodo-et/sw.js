// Método ET v2.0 — limpeza definitiva do Service Worker legado.
// A StudyOS atual não depende de Service Worker para a navegação no Dock.
const CACHE_PREFIX = 'studyos-metodo-et-';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX)).map(key => caches.delete(key)));
    await self.registration.unregister();
    await self.clients.claim();
  })());
});

// Sem interceptação de fetch: rede e navegador controlam os arquivos diretamente.