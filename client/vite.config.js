// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
    proxy: {
      '/api': 'http://localhost:3000', // Proxy API requests to your Express server
    },
  },
});
