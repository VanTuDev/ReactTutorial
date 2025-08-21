import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// import { VitePWA } from 'vite-plugin-pwa'; // 👈 tạm thời tắt

export default defineConfig({
   plugins: [
      react(),
      // 👇 Tạm thời tắt PWA
      // VitePWA({...})
   ],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
   server: {
      port: 9090,
      open: true,
      host: '0.0.0.0',
      strictPort: true,
      proxy: {
         '/api': {
            target: 'http://localhost:9090',
            changeOrigin: true,
            secure: false,
         }
      },
   },
});
