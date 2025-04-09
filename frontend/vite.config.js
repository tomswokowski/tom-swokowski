import { fileURLToPath, URL } from 'node:url';
import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

let devToolsPlugin = [];
if (process.env.NODE_ENV !== 'production') {
  const vueDevTools = require('vite-plugin-vue-devtools').default;
  devToolsPlugin = [vueDevTools()];
}

export default defineConfig({
  plugins: [vue(), ...devToolsPlugin],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../backend/public'),
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
