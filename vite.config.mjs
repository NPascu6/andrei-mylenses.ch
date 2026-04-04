import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import compression from 'vite-plugin-compression';
import {imagetools} from 'vite-imagetools';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
    base: './',
    build: {
        outDir: 'build',
        emptyOutDir: true,
    },
    test: {
        // your test config...
    },
    plugins: [
        react(),
        viteTsconfigPaths(),
        imagetools(),
        compression({
            algorithm: 'gzip',
            threshold: 1024,
        }),
        VitePWA({
            injectRegister: false,
            registerType: 'prompt',
            manifest: false,
            includeAssets: [
                'favicon.ico',
                'apple-touch-icon.png',
                'pwa-192.png',
                'pwa-512.png',
            ],
            workbox: {
                cleanupOutdatedCaches: true,
                clientsClaim: true,
                globIgnores: ['**/admin/**/*', '**/*.gz'],
                navigateFallback: 'index.html',
                navigateFallbackDenylist: [/^\/admin(?:\/|$)/],
                runtimeCaching: [
                    {
                        urlPattern: ({request, url}) =>
                            request.mode === 'navigate' && !url.pathname.startsWith('/admin'),
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'app-pages',
                            networkTimeoutSeconds: 3,
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 7 * 24 * 60 * 60,
                            },
                            cacheableResponse: {
                                statuses: [200],
                            },
                        },
                    },
                    {
                        urlPattern: ({request, url}) =>
                            url.origin === self.location.origin
                            && ['script', 'style'].includes(request.destination),
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'static-assets',
                            expiration: {
                                maxEntries: 40,
                                maxAgeSeconds: 7 * 24 * 60 * 60,
                            },
                        },
                    },
                    {
                        urlPattern: ({request, url}) =>
                            url.origin === self.location.origin
                            && request.destination === 'image'
                            && !url.pathname.startsWith('/admin'),
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'gallery-images',
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                            expiration: {
                                maxEntries: 120,
                                maxAgeSeconds: 30 * 24 * 60 * 60,
                            },
                        },
                    },
                    {
                        urlPattern: ({url}) => url.origin === 'https://fonts.googleapis.com',
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'google-font-styles',
                        },
                    },
                    {
                        urlPattern: ({url}) => url.origin === 'https://fonts.gstatic.com',
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-font-files',
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 365 * 24 * 60 * 60,
                            },
                        },
                    },
                ],
            },
        }),
    ],
    server: {
        open: true,
        port: 3000,
    },
});
