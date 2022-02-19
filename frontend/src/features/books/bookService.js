import axios from 'axios';

const API_URL = '/api/books/';

// Create new book
const createBook = async (bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, bookData, config);

  return response.data;
};

// Get all books
const getBooks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get single book
const getBook = async (bookId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}${bookId}`, config);

  return response.data;
};

// Update book
const updateBook = async (bookData, bookId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}${bookId}`, bookData, config);

  return response.data;
};

const bookService = {
  createBook,
  getBooks,
  getBook,
  updateBook,
};

export default bookService;
