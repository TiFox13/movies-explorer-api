const mongoose = require('mongoose');
const { celebrate, Joi, Segments } = require('celebrate');
const { LINK_SCHEME } = require('../utils/constants');

// валидация id
function method(value, helpers) {
  if (mongoose.isObjectIdOrHexString(value)) {
    return (value);
  }
  return helpers.message('not Id');
}
const idValidator = Joi.string().custom(method, 'custom id validation').required();

const idValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: idValidator,
  }),
});

// валидация полей user
// пользователь может захотеть поменять только имя или только почту,
// поэтому уберу required
const userValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
});

// валидация полей movie
const movieValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .pattern(LINK_SCHEME)
      .required(),
    trailerLink: Joi.string()
      .pattern(LINK_SCHEME)
      .required(),
    thumbnail: Joi.string()
      .pattern(LINK_SCHEME)
      .required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// валидация при регистрации
const registerValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// валидация при входе
const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  idValidation, userValidation, movieValidation, registerValidation, loginValidation,
};
