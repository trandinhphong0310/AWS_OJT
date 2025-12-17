import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './counter/userSlice'

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
})