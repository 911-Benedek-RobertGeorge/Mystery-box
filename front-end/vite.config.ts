import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
    plugins: [
        react(), // React plugin for Vite
        tsconfigPaths(), // TS path alias support
    ],
    server: {
        port: 3000, // Dev server port
        open: true, // Open browser on server start
    },
    // resolve: {
    //     alias: {
    //         '@libs': path.resolve(__dirname, './src/libs'),
    //         '@assets': path.resolve(__dirname, './src/assets'),
    //         '@src': path.resolve(__dirname, './src'),
    //     }}
    resolve: {
        alias: {
            // Path alias
            '@': '/src',
        },
    },
    // define: {
    //     'import.meta.env.VITE_ENV_BACKEND_API': JSON.stringify(
    //         process.env.VITE_ENV_BACKEND_API
    //     ),
    //     'import.meta.env.VITE_ENV_NETWORK': JSON.stringify(
    //         process.env.VITE_ENV_NETWORK
    //     ),
    //     'import.meta.env.VITE_ENV_SOLANA_NETWORK_RPC': JSON.stringify(
    //         process.env.VITE_ENV_SOLANA_NETWORK_RPC
    //     ),
    //     'import.meta.env.VITE_ENV_BACKEND_URL': JSON.stringify(
    //         process.env.VITE_ENV_BACKEND_URL
    //     ),
    //     'import.meta.env.VITE_ENV_BACKEND_PUBLIC_KEY': JSON.stringify(
    //         process.env.VITE_ENV_BACKEND_PUBLIC_KEY
    //     ),
    // },

    define: {
        'import.meta.env': {
            VITE_ENV_NETWORK: JSON.stringify('mainnet-beta'),
            VITE_ENV_SOLANA_NETWORK_RPC: JSON.stringify(
                'https://solana-mainnet.g.alchemy.com/v2/nL4aWYneHAajUr9tLDp4asFLLGnAd45H'
            ),
            VITE_ENV_BACKEND_URL: JSON.stringify(
                'https://ejacdvrot9.execute-api.eu-central-1.amazonaws.com/api'
            ),
            VITE_ENV_BACKEND_PUBLIC_KEY: JSON.stringify(
                process.env.VITE_ENV_BACKEND_PUBLIC_KEY
            ),
        },
    },
    build: {
        sourcemap: true, // Useful for debugging
        outDir: 'dist', // Build output directory
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'], // Separate vendor code
                },
            },
        },
    },
})
