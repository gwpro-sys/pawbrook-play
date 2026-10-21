// Generated immutable shell: 66f2bdc7db18d0d07b6f

const NAME = 'pawbrook-shell-66f2bdc7db18d0d07b6f';
const FILES = ["asset-cf54dbef0aa22ed0a664.apple-touch-icon.png","engine-d6cff0bb6541ddcad7cc.audio.position.worklet.js","engine-d6cff0bb6541ddcad7cc.audio.worklet.js","asset-b2f19b55d329be16c4c9.icon.png","engine-d6cff0bb6541ddcad7cc.js","asset-3cb4495c0b98dfbe4b66.png","./","index.html"];
const URLS = new Set(FILES.map(file => new URL(file, self.registration.scope).href));
self.addEventListener('install', event => event.waitUntil((async () => {
  const cache = await caches.open(NAME);
  // One HTML response for both canonical routes, bypassing Pages' ten-minute TTL.
  const response = await fetch('index.html', {cache:'no-store'});
  if (!response.ok) throw new Error('Shell unavailable');
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', await response.clone().arrayBuffer()));
  const fingerprint = [...digest].map(byte => byte.toString(16).padStart(2, '0')).join('');
  if (fingerprint !== '66f2bdc7db18d0d07b6f92c3e085105e8328e515d24d6933b01c101fe38cb980') throw new Error('Deployment changed during shell installation; retry on next visit');
  await cache.put('./', response.clone());
  await cache.put('index.html', response);
  await cache.addAll(FILES.filter(file => file !== './' && file !== 'index.html'));
  await self.skipWaiting();
})()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  const previous = (await caches.keys()).filter(name => name.startsWith('pawbrook-shell-') && name !== NAME);
  for (const old of previous.slice(0, -1)) await caches.delete(old);
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (event.request.mode === 'navigate' && (url.pathname === new URL('./', self.registration.scope).pathname || url.pathname === new URL('index.html', self.registration.scope).pathname)) {
    // Network first: an update must not silently get stuck on a cached old game.
    event.respondWith((async () => {
      let response;
      try {
        response = await fetch(event.request, {cache:'no-store'});
        if (response.ok) return response;
      } catch { /* Offline: retain the last usable game, without touching saves. */ }
      return (await (await caches.open(NAME)).match('index.html')) || response || Response.error();
    })());
  } else if (URLS.has(url.href)) {
    event.respondWith((async () => (await (await caches.open(NAME)).match(event.request)) || fetch(event.request))());
  }
});
