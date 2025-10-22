import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

//export de um objeto
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src',
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/services',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment: './prisma/vitest-environment-prisma/prisma-test-environment.ts',
        },
      },
    ],
  },
});
