import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 5175,
    cors: true,
    strictPort: true,
  },
  preview: {
    port: 5175,
    strictPort: true,
  },
  base: '/',
})
