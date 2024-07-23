import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "./apiConfig";

// Async thunk to fetch services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    try {
      const response = await axios.get(`${apiURL}/services/fetchServices`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch services");
    }
  }
);

// Async thunk to create a new service
export const createService = createAsyncThunk(
  "services/createService",
  async (newService) => {
    try {
      const response = await axios.post(`${apiURL}/services`, newService);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create service");
    }
  }
);

// Async thunk to delete a service
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (serviceId) => {
    try {
      await axios.delete(`${apiURL}/services/${serviceId}`);
      return serviceId;
    } catch (error) {
      throw new Error("Failed to delete service");
    }
  }
);

export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ serviceId, updatedService }) => {
    try {
      const response = await axios.put(
        `${apiURL}/services/updateServices/${serviceId}`,
        updatedService
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update service");
    }
  }
);

// Initial State
const initialState = {
  services: [],
  loading: false,
  error: null,
};

// Slice
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(
          (service) => service._id !== action.payload
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.map((service) =>
          service._id === action.payload._id ? action.payload : service
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default servicesSlice.reducer;
