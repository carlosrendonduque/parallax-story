import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react(), basicSsl()],
  base: '/parallax-story/',
  server: {
    host: '0.0.0.0',
    port: 3000,
    https: true
  },
  build: {
    outDir: 'dist'
  }
})