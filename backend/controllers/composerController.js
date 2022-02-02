const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Composer = require('../models/composerModel');

// @desc    Get all composers
// @route   GET /api/composers
// @access  Public
const getComposers = asyncHandler(async (req, res) => {
  const composers = await Composer.find();
  res.status(200).json(composers);
});

// @desc    Get single ticket
// @route   GET /api/composers/:composerId
// @access  Public
const getComposer = asyncHandler(async (req, res) => {
  // Need to get composer by id due to multiple composers with the same name
  // Maybe a button next to a composer in the list all composers to
  // display works by that composer only.
  const composer = await Composer.findById(req.params.composerId);

  if (!composer) {
    res.status(404);
    throw new Error('Composer not found');
  }

  res.status(200).json(composer);
});

// @desc    Crate new composer
// @route   POST /api/composers
// @access  Private
const createComposer = asyncHandler(async (req, res) => {
  const { surname, names, country, born, dead } = req.body;

  if (!surname) {
    res.status(400);
    throw new Error('Please add at least a surname');
  }

  const ticket = await Composer.create({
    surname,
    names,
    country,
    born,
    dead,
  });
  res.status(201).json(ticket);
});

// @desc    Delete composer
// @route   DELETE /api/composers/:composerId
// @access  Private
const deleteComposer = asyncHandler(async (req, res) => {
  const composer = await Composer.findById(req.params.composerId);

  if (!composer) {
    res.status(404);
    throw new Error('Composer not found');
  }

  await composer.remove();

  res.status(202).json({ success: true });
});

// @desc    Update composer
// @route   PUT /api/composers/:composerId
// @access  Private
const updateComposer = asyncHandler(async (req, res) => {
  // Check if composer is a valid ObjectId
  const composerIsValid = mongoose.isValidObjectId(req.params.id);

  if (!composerIsValid) {
    res.status(400);
    throw new Error('Composer ID not valid');
  }

  const composer = await Composer.findById(req.params.composerId);

  if (!composer) {
    res.status(404);
    throw new Error('Composer not found');
  }

  const updatedComposer = await Composer.findByIdAndUpdate(
    req.params.composerId,
    req.body,
    { new: true }
  );

  res.status(201).json(updatedComposer);
});

module.exports = {
  getComposers,
  getComposer,
  createComposer,
  deleteComposer,
  updateComposer,
};
