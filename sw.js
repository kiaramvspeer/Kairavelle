const CACHE_NAME = 'kairavelle-shell-v12';
const APP_FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './assets/kairavelle-inclusive.jpg?v=9', './assets/idea-casual.jpg?v=9', './assets/idea-work.jpg?v=9', './assets/idea-weekend.jpg?v=9', './assets/idea-men-casual.png?v=11', './assets/idea-men-work.png?v=11', './assets/idea-men-weekend.png?v=11'];
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
