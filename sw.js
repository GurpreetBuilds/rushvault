const CACHE_NAME = 'rush-vault-v1';
const urlsToCache = [
  './',
  './index.html'
];

// Jab app pehli baar install/load hogi
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // Update ko turant active karo
});

// Purana data delete karne ke liye taaki phone bhaari na ho
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Internet slow/off ho toh saved data (cache) se app chalao
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
