// Explyra PWA Service Worker v9.3
// Production-tuned for faster loads across Android, iOS, Windows, Linux, and macOS.

const VERSION = 'v9.4';
const CORE_CACHE = `explyra-core-${VERSION}`;
const ASSET_CACHE = `explyra-assets-${VERSION}`;
const CDN_CACHE = `explyra-cdn-${VERSION}`;
const OFFLINE_URL = './offline.html';

const PRECACHE_ASSETS = [
    './',
    './index.html',
    './offline.html',
    './manifest.json',
    './css/main.css',
    './css/index.css',
    './css/common.css',
    './js/main.js',
    './js/env.js',
    './js/global-enhancements.js',
    './assets/images/explyra_logo.png',
    './android-chrome-192x192.png',
    './android-chrome-512x512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

const CDN_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'unpkg.com'];
const API_HOST_HINTS = ['firestore.googleapis.com', 'identitytoolkit.googleapis.com', 'securetoken.googleapis.com'];
const STATIC_EXT_RE = /\.(?:css|js|mjs|png|jpg|jpeg|webp|avif|svg|gif|ico|woff|woff2|ttf|eot|json|xml|txt)$/i;

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CORE_CACHE);
        await Promise.allSettled(
            PRECACHE_ASSETS.map(async (asset) => {
                try {
                    const res = await fetch(asset, { cache: 'no-cache' });
                    if (res && res.ok) {
                        await cache.put(asset, res);
                    }
                } catch (err) {
                    // Ignore optional precache misses to avoid install failure.
                }
            })
        );
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const keep = new Set([CORE_CACHE, ASSET_CACHE, CDN_CACHE]);
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => (keep.has(key) ? Promise.resolve() : caches.delete(key))));

        if (self.registration.navigationPreload) {
            await self.registration.navigationPreload.enable();
        }

        await self.clients.claim();
    })());
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (!url.protocol.startsWith('http')) return;

    // Skip chrome extension URLs, range requests, and explicit no-store requests.
    if (url.protocol === 'chrome-extension:' || request.headers.has('range')) return;
    if (request.cache === 'no-store') return;

    const isApiLike = API_HOST_HINTS.some((host) => url.hostname.includes(host)) || url.pathname.startsWith('/api/');
    if (isApiLike) {
        event.respondWith(fetch(request));
        return;
    }

    if (request.mode === 'navigate') {
        event.respondWith(handleNavigation(event));
        return;
    }

    const isCDN = CDN_HOSTS.some((host) => url.hostname.includes(host));
    if (isCDN) {
        event.respondWith(staleWhileRevalidate(request, CDN_CACHE));
        return;
    }

    if (STATIC_EXT_RE.test(url.pathname)) {
        event.respondWith(staleWhileRevalidate(request, ASSET_CACHE));
        return;
    }

    event.respondWith(networkFirst(request, CORE_CACHE, 3000));
});

async function handleNavigation(event) {
    try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
            const cache = await caches.open(CORE_CACHE);
            cache.put(event.request, preloadResponse.clone());
            return preloadResponse;
        }
    } catch (err) {
        // Continue to network-first fallback.
    }

    const response = await networkFirst(event.request, CORE_CACHE, 4000);
    if (response) return response;

    const cache = await caches.open(CORE_CACHE);
    return (await cache.match(OFFLINE_URL)) || Response.error();
}

async function networkFirst(request, cacheName, timeoutMs) {
    const cache = await caches.open(cacheName);

    try {
        const networkResponse = await fetchWithTimeout(request, timeoutMs);
        if (networkResponse && networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (err) {
        return cache.match(request);
    }
}

async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    const networkPromise = fetch(request)
        .then((response) => {
            if (response && response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => cached);

    return cached || networkPromise;
}

function fetchWithTimeout(request, timeoutMs) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Network timeout')), timeoutMs);
        fetch(request)
            .then((res) => {
                clearTimeout(timer);
                resolve(res);
            })
            .catch((err) => {
                clearTimeout(timer);
                reject(err);
            });
    });
}

// Background Sync for replaying offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-expenses') {
        event.waitUntil(processPendingExpenses());
    }
});

// Periodic Background Sync for data freshness
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'content-sync') {
        event.waitUntil(updateContent());
    }
});

async function processPendingExpenses() {
    console.log('[SW] Processing pending expenses...');
    // Real implementation would involve IndexedDB or a queue.
}

async function updateContent() {
    console.log('[SW] Performing periodic content sync...');
    const cache = await caches.open(CORE_CACHE);
    await cache.add('./index.html');
}

self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : { title: 'Explyra Update', body: 'New notification!' };
    const options = {
        body: data.body,
        icon: './android-chrome-192x192.png',
        badge: './favicon-32x32.png',
        vibrate: [100, 50, 100],
        data: { url: data.url || './' }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow(event.notification.data.url);
        })
    );
});


