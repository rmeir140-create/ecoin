// Retires the old ECOIN service worker at this address: clears its caches, unregisters,
// and sends open windows to the new address.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window', includeUncontrolled: true })) {
    try { await c.navigate('https://ecoin-il.github.io/'); } catch {}
  }
})()));
self.addEventListener('fetch', () => {});   // never serve anything from cache again
