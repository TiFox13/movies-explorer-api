const router = require('express').Router();

const usersRouter = require('./users');
const movieRouter = require('./movies');

const { register, login } = require('../controllers/usersControllers');

// регистрация
router.post('/signup', register);
// авторизация
router.post('/signin', login);

router.use('/users', usersRouter);
router.use('/movie', usersRouter);

module.exports = router;