import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    
  ],
  server: {
    proxy:{
      '/api': {
        target: 'https://back-end-jobs-api-main-3cw2mc.laravel.cloud',

        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },

   
   
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
