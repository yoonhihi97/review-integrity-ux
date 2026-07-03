import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/review-integrity-ux/',
  // base: '/',
  plugins: [react()],
});
