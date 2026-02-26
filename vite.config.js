import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  const coinrankingApiKey = process.env.COINRANKING_API_KEY
  const optionalHeaders = coinrankingApiKey
    ? { 'x-access-token': coinrankingApiKey }
    : undefined

  return {
    plugins: [react()],
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
