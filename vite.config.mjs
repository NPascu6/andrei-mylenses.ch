import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import {imagetools} from 'vite-imagetools';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: './',
    build: {
        outDir: 'build',
        emptyOutDir: true,
    },
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
    },
    plugins: [
        tailwindcss(),
        react(),
        imagetools(),
        compression({
            algorithm: 'gzip',
            threshold: 1024,
        }),
    ],
    server: {
        open: true,
        port: 3000,
    },
});
