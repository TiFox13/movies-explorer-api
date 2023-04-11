const { PORT = 3001 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error');
const router = require('./routes/index');
const { db } = require('./utils/configs');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
  message:
    'С вашего IP адреса совершено слишком много запросов. Пожалуйста, попробуйте снова через 15 минут',
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors());
app.use(helmet());
app.use(limiter); // подключили лимитер

app.use(router);

app.use(errorLogger);

// отлов ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
