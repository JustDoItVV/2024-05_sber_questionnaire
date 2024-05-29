import { defineConfig, loadEnv } from 'vite';

import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],

    server: {
      port: parseInt(env.VITE_PORT, 10),
    },

    preview: {
      port: parseInt(env.VITE_PORT_PREVIEW, 10),
    },
  }
});
