import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import composerService from './composerService';

const initialState = {
  composers: [],
  composer: {},
  isError: false,
  isLoading: false,
  message: '',
};

// Create new composer
export const createComposer = createAsyncThunk(
  'composers/create',
  async (composerData, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth.user;

      return await composerService.createComposer(composerData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(message);
    }
  },
);

// Get composers
export const getComposers = createAsyncThunk(
  'composers/getAll',
  async (_, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth.user;

      return await composerService.getComposers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(message);
    }
  },
);

// Get single composer
export const getComposer = createAsyncThunk(
  'composers/getOne',
  async (composerId, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth.user;

      return await composerService.getComposer(composerId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(message);
    }
  },
);

export const composerSlice = createSlice({
  name: 'composers',
  initialState,
  reducers: {
    reset: (state) => {
      state.composers = [];
      state.composer = {};
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComposer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComposer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createComposer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getComposers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComposers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.composers = action.payload;
      })
      .addCase(getComposers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getComposer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComposer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.composer = action.payload;
      })
      .addCase(getComposer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = composerSlice.actions;

export default composerSlice.reducer;
