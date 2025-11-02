import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  // Ensure proper base path for Vercel deployment
  base: '/',
  build: {
    // Optimize build for production
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Ensure proper chunking
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
