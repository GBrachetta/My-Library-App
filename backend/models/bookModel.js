const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a title'],
    },
    subtitle: {
      type: String,
    },
    composer: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please add a composer'],
      ref: 'Composer',
    },
    setting: {
      type: String,
      required: [true, 'Please enter the setting'],
    },
    composed: {
      type: String,
    },
    publisher: {
      type: String,
    },
    remarks: {
      type: String,
    },
    hasParts: {
      type: String,
      enum: ['yes', 'no', 'n/a'],
      default: 'n/a',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', bookSchema);
