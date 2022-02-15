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
  extraReducers: (builder) => {},
});

export const { reset } = composerSlice.actions;

export default composerSlice.reducer;
