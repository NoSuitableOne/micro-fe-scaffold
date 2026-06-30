import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5174,
    cors: true,
    strictPort: true,
  },
  preview: {
    port: 5174,
    strictPort: true,
  },
  base: '/',
})
