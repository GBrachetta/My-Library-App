const jwt = require('jsonwebtoken');
const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  verifyToken,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/verify-email/:verificationToken', verifyToken);

module.exports = router;
