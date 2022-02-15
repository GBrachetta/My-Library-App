const mongoose = require('mongoose');

const composerSchema = mongoose.Schema({
  surname: {
    type: String,
    required: [true, 'Please enter a surname'],
  },
  names: {
    type: String,
  },
  country: {
    type: String,
  },
  born: {
    type: String,
  },
  died: {
    type: String,
  },
});

module.exports = mongoose.model('Composer', composerSchema);
