const express = require('express');
const router = express.Router();

let { store } = require('../store');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Список книг',
    books: store.books,
  });
});

module.exports = router;
