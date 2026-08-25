import { defineConfig, type Plugin } from 'vite';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import react from '@vitejs/plugin-react';
import { cloudflare } from '@cloudflare/vite-plugin';

function inlineCriticalCss(): Plugin {
  return {
    name: 'inline-critical-css',
    apply: 'build',
    async closeBundle() {
      const outDir = join(process.cwd(), 'dist');
      const cssFile = (await readdir(join(outDir, 'assets'))).find(file => file.endsWith('.css'));
      if (!cssFile) return;
      const indexPath = join(outDir, 'index.html');
      const [html, css] = await Promise.all([readFile(indexPath, 'utf8'), readFile(join(outDir, 'assets', cssFile), 'utf8')]);
      const inline = `<style data-inline-critical-css>${css}</style>`;
      const fallback = `<link rel="preload" href="/assets/${cssFile}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="/assets/${cssFile}"></noscript>`;
      const result = html.replace(`<link rel="stylesheet" crossorigin href="/assets/${cssFile}">`, `${inline}${fallback}`);
      await writeFile(indexPath, result);
    },
  };
}

export default defineConfig({
  plugins: [react(), cloudflare(), inlineCriticalCss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) return 'react';
          if (id.includes('node_modules/lucide-react')) return 'icons';
        },
      },
    },
  },
});
