const express = require('express');
const router = express.Router();

let { getStore } = require('../../store');

router.get('/update/:id', (req, res) => {
  const { books } = getStore();
  const { id } = req.params;

  const book = books.find((book) => book.id === id);

  if (!book) {
    res.status(404);
    res.json('404 | книга не найдена');
    return;
  }

  res.render('book/book', {
    title: 'Редактировать книгу',
    book,
  });
});

router.get('/view/:id', async (req, res) => {
  const { books } = getStore();
  const { id } = req.params;

  const book = books.find((book) => book.id === id);

  const response = await fetch(`http://counter:3002/counter/${id}/incr`, {
    method: 'POST',
  });
  const data = await response.json();

  if (!book) {
    res.status(404);
    res.json('404 | книга не найдена');
    return;
  }

  res.render('book/book-info', {
    title: 'Информация о книге',
    book,
    counter: data.incr,
  });
});

router.get('/', (req, res) => {
  res.render('book/create-book', {
    title: 'Создать книгу',
  });
});

module.exports = router;
