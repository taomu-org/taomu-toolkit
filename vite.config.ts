/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
  },

  build: {
    lib: {
      name: 'taomu-toolkit',
      entry: './lib/main.ts',
      formats: ['es', 'cjs'],
      fileName: 'main',
    },
  },
})
