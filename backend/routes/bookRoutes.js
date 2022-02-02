const express = require('express');
const {
  getBooks,
  addBook,
  getBook,
  deleteBook,
  updateBook,
} = require('../controllers/bookController');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getBooks).post(admin, addBook);

router
  .route('/:bookId')
  .get(protect, getBook)
  .delete(admin, deleteBook)
  .put(admin, updateBook);

module.exports = router;
