import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isDev = env.NODE_ENV !== 'production';

  const plugins = [vue(), tailwindcss()];

  if (isDev) {
    try {
      const { default: vueDevTools } = await import('vite-plugin-vue-devtools');
      plugins.push(vueDevTools());
    } catch {
      console.warn('[vite] vite-plugin-vue-devtools not installed, skipping...');
    }
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
        '/api': env.VITE_BACKEND_URL,
        '/auth': env.VITE_BACKEND_URL,
      },
    },
  };
});
