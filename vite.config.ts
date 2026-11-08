import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // The Three.js chunk is large but lazy-loaded after the page text renders.
    chunkSizeWarningLimit: 900,
  },
});
