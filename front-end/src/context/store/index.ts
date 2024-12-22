// src/store/index.js

import { configureStore } from '@reduxjs/toolkit'
import solanaReducer from './SolanaSlice'
import boxReducer from './BoxSlice'
import authReducer from './AuthSlice'

const store = configureStore({
    reducer: {
        solana: solanaReducer,
        box: boxReducer,
        auth: authReducer,
    },
})

export default store
