import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import compression from 'vite-plugin-compression';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
    base: './',
    build: {
        outDir: './build',
        emptyOutDir: true,
    },
    test: {
        // your test config...
    },
    plugins: [
        react(),
        viteTsconfigPaths(),
        compression({
            algorithm: 'gzip',
            threshold: 1024,
        }),
        VitePWA({
            manifest: {
                short_name: 'My Lenses, by Andrei Pascu',
                name: "Andrei Pascu's online web gallery.",
                icons: [
                    {
                        src: 'favicon.ico',
                        sizes: '64x64 32x32 24x24 16x16',
                        type: 'image/x-icon'
                    },
                    {
                        src: 'logo192.png',
                        type: 'image/png',
                        sizes: '16x16'
                    }
                ],
                start_url: '.',
                display: 'standalone',
                theme_color: '#000000',
                background_color: '#ffffff'
            }
        }),
    ],
    server: {
        open: true,
        port: 3000,
    },
});
