const LINK_SCHEME = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

// сообщения об ошибках и ответы
const authorizationError = 'Требуется авторизация';
const serverError = 'На сервере произошла ошибка';
const urlNotFound = 'Страницы по данному адресу не существует';

const notOwnerError = 'Нельзя удалять чужие фильмы';
const responseToDeletion = 'Фильм успешно удален';
const incorrectEmailPassword = 'Неправильные почта или пароль';
const incorrectData = 'Переданы некорректные данные для создания'; // (пользователя или фильма это можно корректировать)
const notFound = 'с указанным _id не найден'; //  (пользователь или фильм это можно корректировать)
const incorrectEditingData = 'Переданы некорректные данные при обновлении профиля';
const duplicateEmailError = 'Пользователь с таким email уже существует';
const incorrectMovieId = 'Переданы некорректные данные _id фильма';
const incorrectLink = 'Некорректный формат ссылки';
const notEmailError = 'Поле "email" должно быть email-адресом';
const antiDdosMessage = 'С вашего IP адреса совершено слишком много запросов. Пожалуйста, попробуйте снова через 15 минут';

module.exports = {
  LINK_SCHEME,
  authorizationError,
  serverError,
  urlNotFound,
  notOwnerError,
  responseToDeletion,
  incorrectEmailPassword,
  incorrectData,
  notFound,
  incorrectEditingData,
  duplicateEmailError,
  incorrectMovieId,
  incorrectLink,
  notEmailError,
  antiDdosMessage,
};
