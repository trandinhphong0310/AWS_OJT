import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../../components/Utils/axiosCustomize'

const initialState = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
    },
    isAuthenticated: false,
    isLoading: false,
    isError: false,
}

export const fetchUserLogin = createAsyncThunk(
    'users/login',
    async ({ email, password }) => {
        try {
            const response = await instance.post(
                'http://localhost:8081/api/v1/login',
                { email, password }
            )
            return response
        } catch (err) {
            console.log('Error in fetchUserLogin:', err)
        }
    }
)

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.account = initialState.account
            state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserLogin.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchUserLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.account = {
                    access_token: action.payload.DT.access_token,
                    refresh_token: action.payload.DT.refresh_token,
                    username: action.payload.DT.username,
                    image: action.payload.DT.image,
                    role: action.payload.DT.role,
                }
                state.isAuthenticated = true
                state.isError = false
            })
            .addCase(fetchUserLogin.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
    }
})

export const { logout } = userReducer.actions
export default userReducer.reducer
