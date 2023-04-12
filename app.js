const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');
const errorHandler = require('./middlewares/error');
const router = require('./routes/index');

const { NODE_ENV, MONGO } = process.env;
const { MONGO_DEV } = require('./utils/configs');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(NODE_ENV === 'production' ? MONGO : MONGO_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
