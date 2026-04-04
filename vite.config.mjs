import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import compression from 'vite-plugin-compression';
import {imagetools} from 'vite-imagetools';

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
    ],
    server: {
        open: true,
        port: 3000,
    },
});
