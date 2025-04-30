/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isDev = env.NODE_ENV === 'development'

  return {
    base: './',
    plugins: [react(), svgr(), tsconfigPaths()],
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 6600,
      proxy: {
        '/api': {
          target: 'http://localhost:9999',
          changeOrigin: true,
        },
      },
      host: true,
    },
    css: {
      devSourcemap: true,
    },
    build: {
      minify: !isDev,
      sourcemap: isDev,
      emptyOutDir: true,
    },
  }
})
