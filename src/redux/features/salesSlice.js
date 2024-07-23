import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from './apiConfig';
import Cookies from 'js-cookie';

// Async thunk to create a new sale
export const createSale = createAsyncThunk(
  'sales/createSale',
  async (saleData, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token'); // Fetch the token from cookies
      const response = await axios.post(`${apiURL}/sales/post`, saleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk to fetch sales
export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  const token = Cookies.get('token'); // Fetch the token from cookies
  try {
    const response = await axios.get(`${apiURL}/sales/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch sales');
  }
});

// Async thunk to delete a sale
export const deleteSale = createAsyncThunk('sales/deleteSale', async (saleId) => {
  try {
    const token = Cookies.get('token'); // Fetch the token from cookies
    await axios.delete(`${apiURL}/sales/delete/${saleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return saleId;
  } catch (err) {
    throw new Error('Failed to delete sale');
  }
});

// Async thunk to update a sale's status
export const updateSaleStatus = createAsyncThunk(
  'sales/updateSaleStatus',
  async ({ saleId, status }, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token'); // Fetch the token from cookies
      const response = await axios.put(`${apiURL}/sales/update/${saleId}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
      })
      .addCase(updateSaleStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSaleStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sales.findIndex((sale) => sale._id === action.payload._id);
        if (index !== -1) {
          state.sales[index] = action.payload;
        }
      })
      .addCase(updateSaleStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default salesSlice.reducer;
