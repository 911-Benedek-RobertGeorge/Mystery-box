// src/store/index.js

import { configureStore } from '@reduxjs/toolkit'
import solanaReducer from './SolanaSlice'
import boxReducer from './BoxSlice'

const store = configureStore({
    reducer: {
        solana: solanaReducer,
        box: boxReducer,
    },
})

export default store
