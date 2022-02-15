import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import composerService from './composerService';

const initialState = {
  composers: [],
  composer: {},
  isError: false,
  isSuccess: false,
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

export const composerSlice = createSlice({
  name: 'composer',
  initialState,
  reducers: {
    reset: (state) => {
      state.composers = [];
      state.composer = {};
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
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
        state.isSuccess = true;
      })
      .addCase(createComposer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = composerSlice.actions;

export default composerSlice.reducer;
