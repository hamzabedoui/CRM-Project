import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from './apiConfig';
import Cookies from 'js-cookie';

// Initial state for the login slice
const initialState = {
  loading: false,
  error: null,
  userInfos: null,
};

// Async thunk to handle user login
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (loginData) => {
    try {
      const response = await axios.post(`${apiURL}/auth/login`, loginData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to fetch user details
export const getUserDetails = createAsyncThunk(
  'login/getUserDetails',
  async () => {
    try {
      const response = await axios.get(`${apiURL}/auth/userinfo`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to handle user sign out
export const signOutUser = createAsyncThunk(
  'login/signOutUser',
  async () => {
    try {
      await axios.post(`${apiURL}/auth/signOut`, null, {
        withCredentials: true,
      });
      return {}; // Clear user data upon successful sign-out
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to handle profile update
export const updateProfile = createAsyncThunk(
  'login/updateProfile',
  async (formData) => {
    try {
      const response = await axios.put(`${apiURL}/auth/edit-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Create the login slice
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducers for loginUser async thunk
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfos = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Reducers for getUserDetails async thunk
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfos = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user details';
      })
      // Reducers for signOutUser async thunk
      .addCase(signOutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.loading = false;
        state.userInfos = null; // Clear user data upon successful sign-out
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign-out failed';
      })
      // Reducers for updateProfile async thunk
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfos = action.payload.user; // Update user info in state
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Profile update failed';
      });
  },
});

// Export the reducer and selector
export default loginSlice.reducer;
export const selectLogin = (state) => state.login;
