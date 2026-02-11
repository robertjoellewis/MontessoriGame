import { defineConfig } from 'vite';

export default defineConfig({
  // Base path for GitHub Pages deployment
  // Format: '/repository-name/'
  // Change this to match your GitHub repository name
  base: '/MontessoriGame/',

  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },

  // Server configuration for local development
  server: {
    port: 5173,
    open: true,
  },
});
