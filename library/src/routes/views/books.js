const express = require('express');
const router = express.Router();

const Book = require('../../store/schema/Book');

router.get('/update/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).select('-__v');

    if (!book) {
      res.status(404);
      res.json('404 | книга не найдена');
      return;
    }

    res.render('book/book', {
      title: 'Редактировать книгу',
      book,
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/view/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).select('-__v');

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
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/', (req, res) => {
  res.render('book/create-book', {
    title: 'Создать книгу',
  });
});

module.exports = router;
