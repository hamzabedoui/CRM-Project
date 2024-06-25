import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from '../features/apiConfig'; 
const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiURL}/auth/register`, userData); 
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
