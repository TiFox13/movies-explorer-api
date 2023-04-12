const rateLimit = require('express-rate-limit');
const { antiDdosMessage } = require('./constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
  message: antiDdosMessage,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
