import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    price: null,
}

const solanaSlice = createSlice({
    name: 'solana',
    initialState,
    reducers: {
        setSolanaPrice: (state, action) => {
            state.price = action.payload
        },
    },
})

export const { setSolanaPrice } = solanaSlice.actions
export default solanaSlice.reducer
