import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cwd } from 'node:process'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '')
  const coinrankingApiKey = env.COINRANKING_API_KEY
  const optionalHeaders = coinrankingApiKey
    ? { 'x-access-token': coinrankingApiKey }
    : undefined

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: 'https://api.coinranking.com/v2',
          changeOrigin: true,
          headers: optionalHeaders,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
