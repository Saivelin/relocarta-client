import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { dependencies } from './package.json';

function renderChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig(({ mode }) => {
  dotenv.config({ path: resolve(process.cwd(), `.env.${mode}`) });

  const BACKEND_API = process.env.BACKEND_API;

  return {
    publicDir: resolve(process.cwd(), 'public'),
    root: 'src',
    resolve: {
      alias: {
        src: resolve(__dirname, 'src'),
        'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
        'react/jsx-runtime': 'react/jsx-runtime.js',
      },
    },
    plugins: [react()],
    css: {
      modules: {
        generateScopedName: '[name]_[local]_[hash:base64:10]',
      },
    },
    build: {
      outDir: resolve(process.cwd(), 'dist'),
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-router-dom', 'react-dom'],
            ...renderChunks(dependencies),
          },
        },
      },
    },

    server: {
      proxy: {
        '^/api': {
          target: BACKEND_API,
          //rewrite: (path) => path.replace(/^\/api/, ''),
          // xfwd: true,
          // headers: {
          //   'x-forwarded-prefix': '/api',
          // },
          changeOrigin: true,
          secure: false,
        },
        '^/moderator-api': {
          target: BACKEND_API,
          changeOrigin: true,
          secure: false,
        },
        '^/img': {
          target: BACKEND_API,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
