import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production'

    return {
        plugins: [react()],
        server: {
            port: 3000,
            watch: {
                usePolling: true,
            },
        },
        resolve: {
            alias: {
                '@libs': path.resolve(__dirname, './src/libs'),
                '@assets': path.resolve(__dirname, './src/assets'),
                '@src': path.resolve(__dirname, './src'),
            },
        },
        define: isProduction
            ? {
                  'import.meta.env.VITE_ENV_BACKEND_API': JSON.stringify(
                      process.env.VITE_ENV_BACKEND_API
                  ),
                  'import.meta.env.VITE_ENV_NETWORK': JSON.stringify(
                      process.env.VITE_ENV_NETWORK
                  ),
                  'import.meta.env.VITE_ENV_SOLANA_NETWORK_RPC': JSON.stringify(
                      process.env.VITE_ENV_SOLANA_NETWORK_RPC
                  ),
                  'import.meta.env.VITE_ENV_BACKEND_URL': JSON.stringify(
                      process.env.VITE_ENV_BACKEND_URL
                  ),
                  'import.meta.env.VITE_ENV_BACKEND_PUBLIC_KEY': JSON.stringify(
                      process.env.VITE_ENV_BACKEND_PUBLIC_KEY
                  ),
              }
            : {},
    }
})
