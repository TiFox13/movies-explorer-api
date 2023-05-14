const MovieSchema = require('../models/movie');
const { NotFoundError } = require('../Errors/NotFoundError');
const { CastError } = require('../Errors/CastError');
const { Forbidden } = require('../Errors/Forbidden');
const {
  incorrectData,
  notFound,
  notOwnerError,
  responseToDeletion,
  incorrectMovieId,
} = require('../utils/constants');

// получение всех сохраненных ПОЛЬЗОВАТЕЛЕМ фильмов
// т.е это фильмы у которых "создатель" это наш юзер. логично? логично!
function getMovies(req, res, next) {
  return MovieSchema.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
}

// создание фильма
function createMovie(req, res, next) {
  MovieSchema.create({
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    thumbnail: req.body.thumbnail,
    movieId: req.body.movieId, // пока такое, но вообще не это нужно
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError(`${incorrectData} фильма`));
      } else {
        next(err);
      }
    });
}

// удаление фильма из сохраненок по id
function deleteMovie(req, res, next) {
  const id = req.params._id;
  MovieSchema.findById(id)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(`Фильм ${notFound}`));
        return;
      }
      if (movie.owner.valueOf() !== req.user._id) {
        next(new Forbidden(notOwnerError));
        return;
      }
      MovieSchema.findByIdAndRemove(id)
        .then(() => res.send({ message: responseToDeletion }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError(incorrectMovieId));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
