import fs from 'node:fs';
import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/cli/bin/cli.ts'],
    format: ['cjs'],
    banner: {
      js: fs.readFileSync('./banner.txt', 'utf-8'),
    },
    outDir: 'dist',
    clean: true,
    minify: true,
    sourcemap: true,
    esbuildOptions(options) {
      options.legalComments = 'none';
    },
  },
]);
