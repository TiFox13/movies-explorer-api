const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../Errors/Unauthorized');
const { authorizationError } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('../utils/configs');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized(authorizationError));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    next(new Unauthorized(authorizationError));
    return;
  }
  req.user = payload;
  next(); // пропускаем запрос дальше
};

module.exports = auth;
