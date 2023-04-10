const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movieControllers');

router.get('/', getMovies);

router.post('/', createMovie);

router.delete('/:_id', deleteMovie);

module.exports = router;