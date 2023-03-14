const express = require('express');
const router = express.Router();
var appRoot = require('app-root-path');

let { getStore, setStore } = require('../../store');
const { Book } = require('../../store');
const fileMulter = require('../../middlewares/file');

router.get('/', (req, res) => {
  res.json(getStore().books);
});

router.get('/:id', (req, res) => {
  const { books } = getStore();
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
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  } = req.body;

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  );

  const newStore = {
    ...getStore(),
    books: [...getStore().books, newBook],
  };

  setStore(newStore);

  res.status(201);
  res.json(newBook);
});

router.put('/:id', (req, res) => {
  const { books } = getStore();
  const { id } = req.params;
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  } = req.body;

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
    fileBook,
  };

  const newBooks = [...books];
  newBooks[indexOfBook] = bookToEdit;

  const newStore = {
    ...getStore(),
    books: newBooks,
  };

  setStore(newStore);

  res.json(getStore().books[indexOfBook]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const lengthOfBooks = getStore().books.length;

  const newStore = {
    ...getStore(),
    books: getStore().books.filter((book) => book.id !== id),
  };

  setStore(newStore);

  if (lengthOfBooks === getStore().books.length) {
    res.status(404);
    res.json('404 | страница не найдена');
    return;
  }

  res.status(200);
  res.json({ message: 'Book is deleted' });
});

router.post('/upload-file', fileMulter.single('book-file'), (req, res) => {
  if (req.file) {
    const { filename } = req.file;
    res.json({ filename });
  }
  res.json();
});

router.get('/:id/download', (req, res) => {
  const { id } = req.params;

  const book = getStore().books.find((book) => book.id === id);

  const file = `${appRoot}/public/books/${book.fileBook}`;
  res.download(file);
});

module.exports = router;
