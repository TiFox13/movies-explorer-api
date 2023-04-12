require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_DEV } = require('../utils/configs');
const UserSchema = require('../models/user');

const { Conflict } = require('../Errors/Conflict');
const { CastError } = require('../Errors/CastError');
const { NotFoundError } = require('../Errors/NotFoundError');
const {
  duplicateEmailError,
  incorrectData,
  notFound,
  incorrectEditingData,
} = require('../utils/constants');

// регистрация
function register(req, res, next) {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => UserSchema.create({
      email, password: hash, name,
    }))
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict(duplicateEmailError));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new CastError(`${incorrectData} пользователя`));
      } else {
        next(err);
      }
    });
}

// логин
function login(req, res, next) {
  const { email, password } = req.body;

  return UserSchema.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
}

// получение пользователя
function getUser(req, res, next) {
  const id = req.user._id;
  UserSchema.findById(id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(`Пользователь ${notFound}`));
        return;
      }
      // возвращаем пользователя, если он есть
      res.send(user);
    })
    .catch(next);
}

// изменение информации о пользователе
function patchUserInfo(req, res, next) {
  const { email, name } = req.body;
  UserSchema.findOne({ email })
    .then((data) => {
      if (data === null) {
        UserSchema.findByIdAndUpdate(
          req.user._id,
          { email, name },
          { new: true, runValidators: true },
        )
          .then((user) => {
            if (!user) {
              return next(new NotFoundError(`Пользователь ${notFound}`));
            }
            return res.send(user);
          })
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new CastError(incorrectEditingData));
            } else {
              next(err);
            }
          });
      } else {
        next(new CastError(duplicateEmailError));
      }
    })
    .catch(next);
}

module.exports = {
  register,
  login,
  getUser,
  patchUserInfo,
};
