const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { updateComposer } = require('../controllers/composerController');
const {
  getComposers,
  createComposer,
  getComposer,
  deleteComposer,
} = require('../controllers/composerController');

router.route('/').get(getComposers).post(protect, createComposer);

router
  .route('/:composerId')
  .get(getComposer)
  .delete(protect, deleteComposer)
  .put(protect, updateComposer);

module.exports = router;
