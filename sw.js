const CACHE_NAME = 'kairavelle-shell-v14';
const APP_FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './assets/kairavelle-inclusive.jpg?v=14', './assets/hero-men-v2.jpg?v=13', './assets/idea-women-casual-v3.jpg?v=14', './assets/idea-women-work-v3.jpg?v=14', './assets/idea-women-weekend-v3.jpg?v=14', './assets/idea-men-casual-v2.jpg?v=13', './assets/idea-men-work-v2.jpg?v=13', './assets/idea-men-weekend-v2.jpg?v=13'];
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
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  })));
});
