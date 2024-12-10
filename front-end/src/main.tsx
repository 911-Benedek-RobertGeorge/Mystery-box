import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className="relative w-full flex items-center justify-center cursor-custom scrollbar-none overflow-y-hidden ">
            <App />
        </div>
    </StrictMode>
)
