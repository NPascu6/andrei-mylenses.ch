const SHELL_CACHE = 'mylenses-shell-v1';
const STATIC_CACHE = 'mylenses-static-v1';
const IMAGE_CACHE = 'mylenses-images-v1';
const FONT_CACHE = 'mylenses-fonts-v1';
const KNOWN_CACHES = [SHELL_CACHE, STATIC_CACHE, IMAGE_CACHE, FONT_CACHE];

const APP_SHELL_URLS = [
    './',
    './index.html',
    './manifest.json',
    './favicon.ico',
    './apple-touch-icon.png',
    './pwa-192.png',
    './pwa-512.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(SHELL_CACHE).then((cache) => cache.addAll(APP_SHELL_URLS)),
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const cacheKeys = await caches.keys();
        await Promise.all(
            cacheKeys
                .filter((cacheKey) => !KNOWN_CACHES.includes(cacheKey))
                .map((cacheKey) => caches.delete(cacheKey)),
        );
        await self.clients.claim();
    })());
});

self.addEventListener('message', (event) => {
    if (event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

const isCacheableResponse = (response) =>
    response && (response.status === 200 || response.type === 'opaque');

const putInCache = async (cacheName, request, response) => {
    if (!isCacheableResponse(response)) {
        return response;
    }

    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    return response;
};

const networkFirst = async (request) => {
    const shellCache = await caches.open(SHELL_CACHE);

    try {
        const response = await fetch(request);
        return putInCache(STATIC_CACHE, request, response);
    } catch {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        return shellCache.match('./index.html');
    }
};

const staleWhileRevalidate = async (request, cacheName) => {
    const cachedResponse = await caches.match(request);
    const networkResponsePromise = fetch(request)
        .then((response) => putInCache(cacheName, request, response))
        .catch(() => undefined);

    return cachedResponse || networkResponsePromise || fetch(request);
};

const cacheFirst = async (request, cacheName) => {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    const response = await fetch(request);
    return putInCache(cacheName, request, response);
};

self.addEventListener('fetch', (event) => {
    const {request} = event;

    if (request.method !== 'GET') {
        return;
    }

    const url = new URL(request.url);
    const isSameOrigin = url.origin === self.location.origin;
    const isGoogleFontStyle = url.origin === 'https://fonts.googleapis.com';
    const isGoogleFontFile = url.origin === 'https://fonts.gstatic.com';

    if (isSameOrigin && url.pathname.startsWith('/admin')) {
        return;
    }

    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request));
        return;
    }

    if (isSameOrigin && (request.destination === 'script' || request.destination === 'style' || request.destination === 'worker')) {
        event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
        return;
    }

    if (isSameOrigin && request.destination === 'image') {
        event.respondWith(cacheFirst(request, IMAGE_CACHE));
        return;
    }

    if (isGoogleFontStyle) {
        event.respondWith(staleWhileRevalidate(request, FONT_CACHE));
        return;
    }

    if (isGoogleFontFile) {
        event.respondWith(cacheFirst(request, FONT_CACHE));
    }
});
