import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from './apiConfig'
import Cookies from "js-cookie";

const initialState = {
  loading: false,
  error: null,
  userInfos: {},
};

export const loginUser = createAsyncThunk(
  'login/LoginUser',
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

export const getUserDetails = createAsyncThunk(
  'getMe/GetUser',
  async () => {
    try {
      const response = await axios.get(`${apiURL}/auth/userinfo`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'login failed';
      })
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
        state.error = action.error.message || 'cannot get user infos';
      });
  },
});

export default loginSlice.reducer;
export const selectLogin = (state) => state.login;
