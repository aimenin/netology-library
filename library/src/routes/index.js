const express = require('express');
const router = express.Router();

let { getStore } = require('../store');

const Book = require('../store/schema/Book');

router.get('/', async (req, res) => {
  try {
    const books = await Book.find().select('-__v');
    res.render('index', {
      title: 'Список книг',
      books,
    });
  } catch (e) {
    res.render('index', {
      title: 'Список книг',
      books: [],
    });
  }
});

module.exports = router;
