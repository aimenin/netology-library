const express = require('express');
const { v4: uuid } = require('uuid');

class Book {
  constructor(
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
    id = uuid()
  ) {
    this.title = title;
    this.description = description;
    this.id = id;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}

let store = {
  books: [
    new Book('test', 'good test', 'me', 'true', 'me.jpg', 'me.txt', 'fortest'),
  ],
};

const app = express();
app.use(express.json());

app.post('/api/user/login', (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: 'test@mail.ru' });
});

app.get('/api/books', (req, res) => {
  res.json(store.books);
});

app.get('/api/books/:id', (req, res) => {
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

app.post('/api/books/', (req, res) => {
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

app.put('/api/books/:id', (req, res) => {
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

app.delete('/api/books/:id', (req, res) => {
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

const PORT = process.env.PORT || 3000;
console.log('App is listening on port: ' + PORT);
app.listen(PORT);
