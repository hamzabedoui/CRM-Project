import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from './apiConfig';

// Create async thunks
export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiURL}/payments/post`, paymentData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async () => {
    try {
      const response = await axios.get(`${apiURL}/payments/get`);
      return response.data;
    } catch (err) {
      throw new Error('Failed to fetch payments');
    }
  }
);

export const deletePayment = createAsyncThunk(
  'payments/deletePayment',
  async (paymentId, { rejectWithValue }) => {
    try {
      await axios.delete(`${apiURL}/payments/delete/${paymentId}`);
      return paymentId; // Return the ID of the deleted payment
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Initial State
const initialState = {
  payments: [],
  loading: false,
  error: null,
};

// Slice
const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted payment from the state
        state.payments = state.payments.filter(payment => payment._id !== action.payload);
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
