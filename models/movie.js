const mongoose = require('mongoose');
const { LINK_SCHEME, incorrectLink } = require('../utils/constants');

const MovieSchema = new mongoose.Schema({
  // основная информация о фильме
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  // различные изображения и трейлер
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return LINK_SCHEME.test(v);
      },
      message: incorrectLink,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return LINK_SCHEME.test(v);
      },
      message: incorrectLink,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return LINK_SCHEME.test(v);
      },
      message: incorrectLink,
    },
  },

  // id пользователя, сохранившего фильм и id фильма в базе
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },

  // название фильма на русском и англиском
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', MovieSchema);
