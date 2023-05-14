const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('../Errors/Unauthorized');
const { incorrectEmailPassword, notEmailError } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: notEmailError,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email }).select('+password') // this — это модель User
    .orFail(() => {
      throw new Unauthorized(incorrectEmailPassword);
    })
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        throw new Unauthorized(incorrectEmailPassword);
      }
      // нашёлся — сравним хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized(incorrectEmailPassword);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
