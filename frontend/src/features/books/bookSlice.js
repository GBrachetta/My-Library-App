import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import bookService from './bookService';

const initialState = {
  books: [],
  book: {},
  isError: false,
  isLoading: false,
  message: '',
};

// Create new book
export const createBook = createAsyncThunk(
  'books/create',
  async (bookData, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth.user;

      return await bookService.createBook(bookData, token);
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

// Get all books
export const getBooks = createAsyncThunk(
  'books/getAll',
  async (_, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth.user;

      return await bookService.getBooks(token);
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

// Get book
export const getBook = createAsyncThunk(
  'books/getOne',
  async (bookId, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth.user;

      return await bookService.getBook(bookId, token);
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

// Update book
export const updateBook = createAsyncThunk(
  'books/updateBook',
  async ({ bookData, bookId }, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth.user;

      return await bookService.updateBook(bookData, bookId, token);
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

// Delete book
export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (bookId, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth.user;

      return await bookService.deleteBook(bookId, token);
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

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    reset: (state) => {
      state.books = [];
      state.book = {};
      state.isError = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBook.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.book = action.payload;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBook.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bookSlice.actions;

export default bookSlice.reducer;
