const CACHE_NAME = 'kairavelle-shell-v52';
const APP_FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './assets/kairavelle-inclusive.jpg?v=15', './assets/hero-men-v2.jpg?v=13', './assets/idea-women-casual-v4.jpg?v=15', './assets/idea-women-work-v4.jpg?v=15', './assets/idea-women-weekend-v4.jpg?v=15', './assets/idea-men-casual-v3.jpg?v=16', './assets/idea-men-work-v3.jpg?v=16', './assets/idea-men-weekend-v3.jpg?v=16'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  })));
});
