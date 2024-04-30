// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'; 

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5174,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '/Users/pulkitmatta/redboard/qe-infra-engine/redboard/UI/my-react-app/src'), 
    },
  },
});
