import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Exclude template directories from tests
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/templates/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
    ],
    // Include only src directory tests
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
