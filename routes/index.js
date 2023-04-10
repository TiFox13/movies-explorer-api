const router = require('express').Router();

const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const movieRouter = require('./movies');

const { register, login } = require('../controllers/usersControllers');

// регистрация
router.post('/signup', register);
// авторизация
router.post('/signin', login);

router.use('/users', auth, usersRouter);
router.use('/movie', auth, movieRouter);

module.exports = router;