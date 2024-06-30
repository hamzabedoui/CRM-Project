import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from './apiConfig';

// Async thunk to create a new sale
export const createSale = createAsyncThunk(
  'sales/createSale',
  async (saleData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiURL}/sales/post`, saleData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk to fetch sales
export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  try {
    const response = await axios.get(`${apiURL}/sales/get`);
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch sales');
  }
});

// Async thunk to delete a sale
export const deleteSale = createAsyncThunk('sales/deleteSale', async (saleId) => {
  try {
    await axios.delete(`${apiURL}/sales/delete/${saleId}`);
    return saleId;
  } catch (err) {
    throw new Error('Failed to delete sale');
  }
});

// Initial State
const initialState = {
  sales: [],
  loading: false,
  error: null,
};

// Slice
const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSale.fulfilled, (state, action) => {
        state.loading = false;
        state.sales.push(action.payload);
      })
      .addCase(createSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = state.sales.filter((sale) => sale._id !== action.payload);
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default salesSlice.reducer;
