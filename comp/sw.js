// 🚀 Explyra Advanced PWA Service Worker v8.0
// Features: Advanced Caching, Background Sync, Push Notifications, PWA Widgets
// Updated for maximum performance and reliability

const VERSION = 'v8.0';
const CACHE_NAME = `explyra-core-${VERSION}`;
const OFFLINE_URL = './offline.html';

// Toggle for Development (set to false for production)
const DEV_MODE = true; 

// Assets to precache immediately
const PRECACHE_ASSETS = [
    './',
    './index.html',
    './offline.html',
    './manifest.json',
    './assets/images/explyra_logo.png',
    './css/common.css',
    './js/theme.js'
];

// ── INSTALL EVENT ──────────────────────────────────────────
self.addEventListener('install', (event) => {
    console.log('[SW] Install Event:', VERSION);
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Precaching app shell...');
            return cache.addAll(PRECACHE_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// ── ACTIVATE EVENT ─────────────────────────────────────────
self.addEventListener('activate', (event) => {
    console.log('[SW] Activate Event:', VERSION);
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((keys) => {
                return Promise.all(keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[SW] Removing old cache:', key);
                        return caches.delete(key);
                    }
                }));
            }),
            // Enable Navigation Preload
            self.registration.navigationPreload ? self.registration.navigationPreload.enable() : Promise.resolve(),
            // Take immediate control
            self.clients.claim()
        ])
    );
});

// ── FETCH EVENT ────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET and non-HTTP requests
    if (request.method !== 'GET' || !url.protocol.startsWith('http')) return;

    // 🚧 DEVELOPMENT MODE: Network Only for local assets to avoid stale files
    if (DEV_MODE && url.origin === self.location.origin) {
        return; // Let browser handle normally
    }

    // ── Strategy: Navigation ──
    if (request.mode === 'navigate') {
        event.respondWith(handleNavigation(event));
        return;
    }

    // ── Strategy: CDN & Third Party ──
    const isCDN = ['fonts.googleapis.com', 'cdnjs.cloudflare.com', 'unpkg.com'].some(d => url.hostname.includes(d));
    if (isCDN) {
        event.respondWith(staleWhileRevalidate(request, 'explyra-cdn-cache'));
        return;
    }

    // ── Strategy: Local Assets ──
    event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
});

// ──────── HELPERS ──────────

async function handleNavigation(event) {
    try {
        // Try Navigation Preload first
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) return preloadResponse;

        // Try Network
        const networkResponse = await fetch(event.request);
        return networkResponse;
    } catch (e) {
        // Offline Fallback
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);
        return cachedResponse || cache.match(OFFLINE_URL);
    }
}

async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    const networkFetch = fetch(request).then((res) => {
        if (res.ok) cache.put(request, res.clone());
        return res;
    }).catch(() => cachedResponse);

    return cachedResponse || networkFetch;
}

// ── EXTRA FEATURES ─────────────────────────────────────────

// 1. Background Sync (Offline form submission)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-expenses') {
        event.waitUntil(processPendingExpenses());
    }
});

async function processPendingExpenses() {
    console.log('[SW] Processing background sync...');
}

// 2. Push Notifications
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
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow(event.notification.data.url);
        })
    );
});

// 3. PWA Widgets Interactivity
self.addEventListener('widgetclick', (event) => {
    if (event.action === 'refresh') {
        event.waitUntil(updateWidgets());
    }
});

async function updateWidgets() {
    // Implementation for updating widget data
}

// 4. Periodic Background Sync
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'content-update') {
        event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE_ASSETS)));
    }
});

