const mongoose = require('mongoose');
const validator = require('validator');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true,
  },
  body: {
    type: String,
    minlength: 1,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('note', noteSchema);