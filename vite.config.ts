import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite' // 导入插件
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 7777,
    open: true,
    proxy: {
      // 代理 /api 到后端服务器
      '/api': {
        target: 'http://localhost:8080', // 后端服务地址
        changeOrigin: true, // 修改请求头中的 origin
        rewrite: (path) => path.replace(/^\/api/, ''), // 可选：去掉 /api 前缀
      },
    },
  },
})
