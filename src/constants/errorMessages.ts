export const ERROR_MESSAGES = {
  DEFAULT: "Что-то пошло не так. Пожалуйста, попробуйте еще раз.",
  NOT_FOUND: "Страница не найдена",
  BOOK_NOT_FOUND: "Книга не найдена",

  FAILED_FETCH_BOOKS: "Не удалось загрузить книги",
  FAILED_FETCH_BOOK: "Не удалось загрузить информацию о книге",
  NETWORK_ERROR: "Ошибка сети. Проверьте подключение к интернету",

  API_ERROR: "Ошибка при загрузке данных",
  SERVER_ERROR: "Ошибка сервера",

  NO_FAVORITES: "В избранном пока нет книг",
  NO_BOOKS: "Книги не найдены",
  NO_SEARCH_RESULTS: "По вашему запросу ничего не найдено",
} as const;
