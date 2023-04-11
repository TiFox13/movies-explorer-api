const MovieSchema = require('../models/movie');
const { NotFoundError } = require('../Errors/NotFoundError');
const { CastError } = require('../Errors/CastError');
const { Forbidden } = require('../Errors/Forbidden');

// получение всех сохраненных пользователем фильмов
function getMovies(req, res, next) {
  return MovieSchema.find({})
    .then((movies) => res.send(movies))
    .catch(next);
}

// создает фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
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

    movieId: req.user._id, // пока такое, но вообще не это нужно
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные при создании фильма'));
      } else {
        next();
      }
    });
}

// удаление фильма из сохраненок по id
function deleteMovie(req, res, next) {
  const id = req.params._id;
  MovieSchema.findById(id)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм с указанным _id не найден'));
        return;
      }
      if (movie.owner.valueOf() !== req.user._id) {
        next(new Forbidden('Нельзя удалять чужие фильмы'));
        return;
      }
      MovieSchema.findByIdAndRemove(id)
        .then(() => res.send({ message: 'Фильм успешно удален' }))
        .catch();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные _id пользователя'));
      } else {
        next();
      }
    });
  // ФИГОВО РАБОТАЕТ. НУЖНО ЛУЧШЕ ИЗУЧИТЬ deleteOne
//   MovieSchema.deleteOne(id)
//     .then(() => res.send({ message: 'Фильм успешно удален' }))
// // СЮДА НАДО ПРИДУМАТЬ, КАК ДОБАВИТЬ ОТЛАВЛИВАНИЕ СИТУАЦИИ, КОГДА ФИЛЬМ ПО ID НЕ НАШЛИ
// // А ЕЩЕ НУЖНА ПРОВЕРКА, ЯВЛЯЕТСЯ ЛИ ПОЛЬЗОВАТЕЛЬ СОЗДАТЕЛЕМ
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new CastError('Переданы некорректные данные _id пользователя'));
//       } else {
//         next();
//       }
//     })
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
