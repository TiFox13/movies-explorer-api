const router = require('express').Router();

const auth = require('../middlewares/auth');
const { registerValidation, loginValidation } = require('../middlewares/validation');
const usersRouter = require('./users');
const movieRouter = require('./movies');
const { NotFoundError } = require('../Errors/NotFoundError');

const { register, login } = require('../controllers/usersControllers');

// регистрация
router.post('/signup', registerValidation, register);

// авторизация
router.post('/signin', loginValidation, login);

// основные роуты
router.use('/users', auth, usersRouter);
router.use('/movie', auth, movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страницы по данному адресу не существует'));
});

module.exports = router;
