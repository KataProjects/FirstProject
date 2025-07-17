import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@shared': path.resolve(__dirname, 'src/shared/index'),
      '@entities': path.resolve(__dirname, 'src/entities/index'),
      '@features': path.resolve(__dirname, 'src/features/index'),
      '@widgets': path.resolve(__dirname, 'src/widgets/index'),
      '@pages': path.resolve(__dirname, 'src/pages/index'),
    },
  },
});
