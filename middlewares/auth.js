const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../Errors/Unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized('Требуется авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new Unauthorized('Требуется авторизация'));
    return;
  }
  req.user = payload;
  next(); // пропускаем запрос дальше
};

module.exports = auth;