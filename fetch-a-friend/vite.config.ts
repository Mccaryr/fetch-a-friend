import { defineConfig } from "vitest/config"
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    setupFiles: "./src/tests/setupTests.ts",
    environment: "jsdom",
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
