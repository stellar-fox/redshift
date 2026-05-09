import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // relative paths since this is deployed to github pages
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env': {},
    'global': 'globalThis'
  },
  server: {
    fs: {
      allow: [
        '..', // Allow access to monorepo root (for node_modules, etc.)
      ]
    }
  }
})
