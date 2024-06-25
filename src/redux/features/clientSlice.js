// src/slices/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
export const updateUserStatus = createAsyncThunk('users/updateUserStatus', async ({ userId, status }) => {
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
  return { userId, status };
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
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
        const { userId, status } = action.payload;
        const user = state.users.find(user => user._id === userId);
        if (user) {
          user.status = status;
        }
      });
  },
});

export default userSlice.reducer;
