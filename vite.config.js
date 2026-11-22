import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // "/" locally. The deploy workflow sets BASE_PATH to "/<repo-name>/"
  // because GitHub Pages serves project sites from a subfolder.
  base: process.env.BASE_PATH ?? "/",
  // https://vitest.dev/config/
  test: {
    // Simulated browser (document, window, focus) for React components
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
  },
})
