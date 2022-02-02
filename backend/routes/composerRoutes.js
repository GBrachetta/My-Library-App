const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getComposers,
  createComposer,
  getComposer,
  deleteComposer,
  updateComposer,
} = require('../controllers/composerController');

router.route('/').get(protect, getComposers).post(admin, createComposer);

router
  .route('/:composerId')
  .get(protect, getComposer)
  .delete(admin, deleteComposer)
  .put(admin, updateComposer);

module.exports = router;
