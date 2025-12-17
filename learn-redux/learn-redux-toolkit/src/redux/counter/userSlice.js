import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    listUsers: [],
    isLoading: false,
    isError: false,
}

export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async () => {
        const response = await axios.get("http://localhost:8080/users/all")
        return response.data
    },
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.listUsers = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(fetchAllUsers.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
    },
})

export default userSlice.reducer