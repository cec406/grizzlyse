import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the built app installs cleanly from any host or subfolder
// (GitHub Pages, Netlify, a shared drive, or a phone's local server).
export default defineConfig({
  base: './',
  plugins: [react()],
})