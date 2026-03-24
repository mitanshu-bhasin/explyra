const CACHE_NAME = 'explyra-os-v2';
const ASSETS = [
  'explyra-os.html',
  'nobg.png',
  'explyra-os.webmanifest'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
