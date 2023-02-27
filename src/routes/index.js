const express = require('express');
const router = express.Router();

let { getStore } = require('../store');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Список книг',
    books: getStore().books,
  });
});

router.delete('/', (req, res) => {
  res.render('index', {
    title: 'Список книг',
    books: getStore().books,
  });
});

module.exports = router;
