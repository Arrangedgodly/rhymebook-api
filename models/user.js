const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'New User',
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'You must enter a valid email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  preferences: {
    rhy: {
      type: Boolean,
      default: true
    },
    sdl: {
      type: Boolean,
      default: true
    },
    adj: {
      type: Boolean,
      default: true
    },
    noun: {
      type: Boolean,
      default: true
    },
    rlwd: {
      type: Boolean,
      default: true
    },
    syn: {
      type: Boolean,
      default: true
    },
    ant: {
      type: Boolean,
      default: true
    },
    fqfl: {
      type: Boolean,
      default: true
    },
    engine: {
      type: String,
      enum: ['topic', 'ml'],
      default: 'topic'
    },
    max: {
      type: Number,
      default: 10
    }
  }
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect Email or Password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect Email or Password'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
