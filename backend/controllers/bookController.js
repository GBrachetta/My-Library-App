const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Book = require('../models/bookModel');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();

  res.status(200).json(books);
});

// @desc    Get single book
// @route   GET /api/books/:bookId
// @access  Public
const getBook = asyncHandler(async (req, res) => {
  // Check if ticket is a valid ObjectId
  const bookIsValid = mongoose.isValidObjectId(req.params.bookId);

  if (!bookIsValid) {
    res.status(400);
    throw new Error('Book number not valid');
  }

  const book = await Book.findById(req.params.bookId);

  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  res.status(200).json(book);
});

// @desc    Crate new book
// @route   POST /api/books
// @access  Private
const addBook = asyncHandler(async (req, res) => {
  const {
    title,
    subtitle,
    composer,
    setting,
    dateComposed,
    publisher,
    comments,
    hasParts,
    catalogueNumber,
  } = req.body;

  if (!title || !composer) {
    res.status(400);
    throw new Error('Please add a title and composer');
  }

  const book = await Book.create({
    title,
    subtitle,
    composer,
    setting,
    dateComposed,
    publisher,
    comments,
    hasParts,
    catalogueNumber,
    status: 'new',
  });

  res.status(201).json(book);
});

// @desc    Delete book
// @route   DELETE /api/books/:bookId
// @access  Private
const deleteBook = asyncHandler(async (req, res) => {
  // Check if book is a valid ObjectId
  const bookIsValid = mongoose.isValidObjectId(req.params.bookId);

  if (!bookIsValid) {
    res.status(400);
    throw new Error('Book number not valid');
  }

  const book = await Book.findById(req.params.bookId);

  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  await book.remove();

  res.status(202).json({ success: true });
});

// @desc    Update book
// @route   PUT /api/books/:bookId
// @access  Private
const updateBook = asyncHandler(async (req, res) => {
  // Check if book is a valid ObjectId
  const bookIsValid = mongoose.isValidObjectId(req.params.bookId);

  if (!bookIsValid) {
    res.status(400);
    throw new Error('Book number not valid');
  }

  const book = await Book.findById(req.params.bookId);

  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.bookId,
    req.body,
    { new: true },
  );

  res.status(201).json(updatedBook);
});

module.exports = {
  getBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook,
};
