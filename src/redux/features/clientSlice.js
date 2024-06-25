import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from '../features/apiConfig'; 

const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Async thunk to fetch users
// Async thunk to fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('http://localhost:5000/api/clients');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
});

// Async thunk to delete a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  const response = await fetch(`http://localhost:5000/api/clients/${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  return userId;
});

// Async thunk to update user status
export const updateUserStatus = createAsyncThunk(
  'users/updateUserStatus',
  async ({ userId, status }) => {
    const response = await fetch(`http://localhost:5000/api/clients/${userId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update user status');
    }
    return response.json(); // Ensure this returns the updated user object
  }
);
// Async thunk to create a new client
export const createClient = createAsyncThunk(
  'users/createClient',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiURL}/auth/createClient`, userData); 
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(createClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
