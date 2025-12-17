import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  value: 0,
}

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async () => {
    const response = await axios.get("http://localhost:8080/users/all")
    return response.data
  },
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.entities.push(action.payload)
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.entities.push(action.payload)
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.entities.push(action.payload)
      })
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer