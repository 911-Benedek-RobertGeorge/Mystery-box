import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
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
})
