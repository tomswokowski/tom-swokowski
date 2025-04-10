import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const plugins = [vue(), tailwindcss()];

  if (env.NODE_ENV !== 'production') {
    return import('vite-plugin-vue-devtools').then(({ default: vueDevTools }) => {
      plugins.push(vueDevTools());

      return baseConfig(env, plugins);
    });
  }

  return baseConfig(env, plugins);
});

function baseConfig(env, plugins) {
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
}
