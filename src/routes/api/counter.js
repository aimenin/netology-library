const express = require('express');
const router = express.Router();

let { getStore } = require('../../store');
const connectToRedis = require('../../utils/connectToRedis');

router.post('/:bookId/incr', async (req, res) => {
  const { books } = getStore();
  const { bookId } = req.params;

  const book = books.find((book) => book.id === bookId);

  if (!book) {
    res.status(404);
    res.json('404 | книга не найдена');
    return;
  }

  const redisClient = await connectToRedis();

  const incr = await redisClient.incr(book.title);

  res.status(200);
  res.json({ message: 'Incremented!', incr });
});

router.get('/:bookId', async (req, res) => {
  const { books } = getStore();
  const { id } = req.params;

  const book = books.find((book) => book.id === id);

  if (!book) {
    res.status(404);
    res.json('404 | книга не найдена');
    return;
  }

  const redisClient = await connectToRedis();

  try {
    const counter = await redisClient.get(book.title);
    res.status(200);
    res.json({ message: 'Founded', counter });
  } catch {
    res.status(200);
    res.json({ message: 'Not found' });
  }
});

module.exports = router;
