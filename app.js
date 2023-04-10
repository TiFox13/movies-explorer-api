const { PORT = 3001 } = process.env;

const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const router = require('./routes/index');
const errorHandler = require('./middlewares/error');

mongoose.connect('mongodb://0.0.0.0:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});