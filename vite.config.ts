import path from 'node:path'
import process from 'node:process'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import { createVitePlugins } from './build/vite'
import { exclude, include } from './build/vite/optimize'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  return {
    base: mode === 'production' ? 'https://mp-img1.wifixc.com/static/app-h5/' : '/',
    plugins: createVitePlugins(mode),

    server: {
      host: true,
      port: 3000,
      proxy: {
        [env.VITE_APP_API_BASE_URL]: {
          target: 'http://127.0.0.1', // 直接使用 IPv4 地址（保留正确 target）
          ws: false,
          changeOrigin: true,
          secure: false, // 关闭SSL证书验证
          rewrite: path => path.replace(env.VITE_APP_API_BASE_URL, ''),
          headers: {
            Host: env.VITE_APP_API_PROXY_HOST, // 确保虚拟主机识别
          },
        },
      },
    },

    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
        '~': path.join(__dirname, './src/assets'),
        '~root': path.join(__dirname, '.'),
      },
    },

    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
      outDir: env.VITE_APP_OUT_DIR || 'dist',
    },

    optimizeDeps: { include, exclude },
  }
}
