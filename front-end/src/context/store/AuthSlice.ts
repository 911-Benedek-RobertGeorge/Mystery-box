import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    token: string | null
}

const initialState: AuthState = {
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload
            localStorage.setItem('jwtToken', action.payload)
        },
        clearToken(state) {
            state.token = null
            localStorage.removeItem('jwtToken')
        },
    },
})

export const { setToken, clearToken } = authSlice.actions
export default authSlice.reducer
