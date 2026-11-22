import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import generateCaseIndex from './plugins/generate-case-index'
import generateResourceIndex from './plugins/generate-resource-index'

export default defineConfig({
  plugins: [react(), tailwindcss(), generateCaseIndex(), generateResourceIndex()],
  base: './',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    exclude: ['tests/**', 'node_modules/**'],
  },
})
