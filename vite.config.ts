import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

//export de um objeto
export default defineConfig({
  plugins: [tsconfigPaths()],
});
