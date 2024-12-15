// src/store/index.js

import { configureStore } from '@reduxjs/toolkit'
import solanaReducer from './SolanaSlice'

const store = configureStore({
    reducer: {
        solana: solanaReducer,
    },
})

export default store
