/* eslint-disable no-underscore-dangle */
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('../models/userModel');
const { mailTransport, generateEmail } = require('../utils/email');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email: rawEmail, password } = req.body;

  const email = rawEmail.toLowerCase();

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
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  // Email verification
  jwt.sign(
    {
      user: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 3600,
    },
    (err, emailToken) => {
      mailTransport().sendMail({
        from: process.env.USER_EMAIL,
        to: user.email,
        subject: 'Verify your email address',
        html: generateEmail(emailToken),
      });
    }
  );

  await user.save();

  // END BEN
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
  const { email: rawEmail, password } = req.body;

  const email = rawEmail.toLowerCase();

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

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!user.verified) {
    res.status(401);

    throw new Error(
      'Unverified email. Check your spam folder for a confirmation email'
    );
  }

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

const verifyToken = asyncHandler(async (req, res) => {
  try {
    const { user } = jwt.verify(
      req.params.verificationToken,
      process.env.JWT_SECRET
    );

    const userInDb = await User.findById(user);

    if (userInDb.verified) {
      res.status(401);
      throw new Error('Email already verified');
    }

    await User.findByIdAndUpdate(user, { verified: true }, { new: true });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
  return res.redirect(process.env.FRONTEND);
});

// const verifyToken = async (req, res) => {
//   const { verificationToken } = req.params;

//   jwt.verify(
//     verificationToken,
//     process.env.JWT_SECRET,
//     async (err, decodedToken) => {
//       if (err) {
//         res.status(400);
//         throw new Error(err);
//       } else {
//         const { user } = decodedToken;
//         await User.findByIdAndUpdate(user, { verified: true }, { new: true });
//       }
//     }
//   );
//   res.redirect(process.env.FRONTEND);
// };

module.exports = {
  registerUser,
  loginUser,
  getMe,
  verifyToken,
};
