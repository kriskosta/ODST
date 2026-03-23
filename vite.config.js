import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/unit/**/*.{test,spec}.{js,ts}'],
    exclude: ['**/node_modules/**', '**/e2e/**', '**/*.spec.js'],
    reporters: ['verbose', 'junit'],
    outputFile: {
      junit: './test-results/junit.xml',
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
    },
  },
});
