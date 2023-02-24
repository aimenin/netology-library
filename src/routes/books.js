const express = require('express');
const router = express.Router();

let { store } = require('../store');
const { Book } = require('../store');

router.get('/', (req, res) => {
  res.json(store.books);
});

router.get('/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;

  const book = books.find((book) => book.id === id);

  if (!book) {
    res.status(404);
    res.json('404 | книга не найдена');
    return;
  }

  res.json(book);
});

router.post('/', (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  );

  store = {
    ...store,
    books: [...store.books, newBook],
  };

  res.status(201);
  res.json(newBook);
});

router.put('/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  const indexOfBook = books.findIndex((book) => book.id === id);

  if (indexOfBook === -1) {
    res.status(404);
    res.json('404 | книга не найдена');
    return;
  }

  let bookToEdit = books[indexOfBook];
  bookToEdit = {
    ...bookToEdit,
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  };

  const newBooks = [...books];
  newBooks[indexOfBook] = bookToEdit;

  store = {
    ...store,
    books: newBooks,
  };

  res.json(store.books[indexOfBook]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const lengthOfBooks = store.books.length;

  store = {
    ...store,
    books: store.books.filter((book) => book.id !== id),
  };

  if (lengthOfBooks === store.books.length) {
    res.status(404);
    res.json('404 | страница не найдена');
    return;
  }

  res.json('ok');
});

module.exports = router;
