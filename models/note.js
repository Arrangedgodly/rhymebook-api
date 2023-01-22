const mongoose = require('mongoose');
const validator = require('validator');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  }
});

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  tags: {
    type: [tagSchema]
  }
});

module.exports = mongoose.model('note', noteSchema);