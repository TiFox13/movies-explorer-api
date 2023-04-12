const router = require('express').Router();

const auth = require('../middlewares/auth');
const { registerValidation, loginValidation } = require('../middlewares/validation');
const usersRouter = require('./users');
const movieRouter = require('./movies');
const { NotFoundError } = require('../Errors/NotFoundError');
const { urlNotFound } = require('../utils/constants');
const { register, login } = require('../controllers/usersControllers');

// регистрация
router.post('/signup', registerValidation, register);

// авторизация
router.post('/signin', loginValidation, login);

// основные роуты
router.use('/users', auth, usersRouter);
router.use('/movies', auth, movieRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(urlNotFound));
});

module.exports = router;
