const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movieControllers');
const { idValidation, movieValidation } = require('../middlewares/validation');

router.get('/', getMovies);

router.post('/', movieValidation, createMovie);

router.delete('/:_id', idValidation, deleteMovie);

module.exports = router;
