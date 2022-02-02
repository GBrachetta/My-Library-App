/* eslint-disable no-underscore-dangle */
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('../models/userModel');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);

    throw new Error('Please include all fields');
  }

  // Email validation
  if (!validator.isEmail(email)) {
    res.status(400);

    throw new Error('Please enter a valid email address');
  }

  // Password validation
  if (
    !validator.isStrongPassword(password, {
      minLength: 6,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    })
  ) {
    res.status(400);

    throw new Error('Please enter a stronger password');
  }

  // Find if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);

    throw new Error('Please include all fields');
  }

  // Email validation
  if (!validator.isEmail(email)) {
    res.status(400);

    throw new Error('Please enter a valid email address');
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

module.exports = { registerUser, loginUser, getMe };