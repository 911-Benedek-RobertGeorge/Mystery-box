import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './context/store/index.ts'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <div className="relative w-full flex items-center justify-center cursor-custom scrollbar-none overflow-y-hidden ">
                <App />
            </div>{' '}
        </Provider>
        ,
    </StrictMode>
)
