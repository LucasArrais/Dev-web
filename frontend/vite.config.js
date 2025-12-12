import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // porta fixa para o frontend
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // URL do backend
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // remove /api antes de enviar para o backend
      },
    },
  },
})