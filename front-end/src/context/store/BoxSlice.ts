import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    types: null,
}

const boxSlice = createSlice({
    name: 'box',
    initialState,
    reducers: {
        setBoxTypes: (state, action) => {
            state.types = action.payload
        },
    },
})

export const { setBoxTypes } = boxSlice.actions
export default boxSlice.reducer
