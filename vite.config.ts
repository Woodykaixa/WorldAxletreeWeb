import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import { defineConfig } from 'vite';
import reactJsx from 'vite-react-jsx';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactJsx(), reactRefresh()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
  },
  css: {
    postcss: 'tailwind.config.js',
  },
  envDir: './env',
  envPrefix: 'WEB_',
});
