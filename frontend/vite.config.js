import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(async () => {
  const plugins = [vue()];

  if (process.env.NODE_ENV !== 'production') {
    const { default: vueDevTools } = await import('vite-plugin-vue-devtools');
    plugins.push(vueDevTools());
  }

  return {
    plugins,
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
  };
});
