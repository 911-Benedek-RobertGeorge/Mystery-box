import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'

import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import svgrPlugin from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    define: {
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
    },
    server: {
        port: Number(process.env.PORT) || 3000,
        strictPort: true,
        host: true,
        watch: {
            usePolling: false,
            useFsEvents: false,
        },
        hmr: {
            overlay: false,
        },
    },
    plugins: [
        react(),

        basicSsl(),
        tsconfigPaths(),
        svgrPlugin(),
        nodePolyfills({
            globals: { Buffer: true, global: true, process: true },
        }),
    ],
    build: {
        outDir: 'dist',
    },
    preview: {
        port: 3333,
        host: 'localhost',
        strictPort: true,
    },
})
