import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'; 

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    proxy: {
      '/nodes/query': 'http://127.0.0.1:5000',
      '/nodes/aggregate/fetchPivotAggregates': 'http://127.0.0.1:5000',
      '/nodes/data/fetchData': 'http://127.0.0.1:5000',
      '/tasks/add_nodes_task': 'http://127.0.0.1:5000'
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '/Users/pulkitmatta/redboard/qe-infra-engine/redboard/UI/my-react-app/src'), 
    },
  },
});
