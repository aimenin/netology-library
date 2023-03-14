const express = require('express');
const router = express.Router();

const connectToRedis = require('../../utils/connectToRedis');

router.post('/:bookId/incr', async (req, res) => {
  const { bookId } = req.params;

  const redisClient = await connectToRedis();

  const incr = await redisClient.incr(bookId);

  res.status(200);
  res.json({ message: 'Incremented!', incr });
});

router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;

  const redisClient = await connectToRedis();

  try {
    const counter = await redisClient.get(bookId);
    res.status(200);
    res.json({ message: 'Founded', counter });
  } catch {
    res.status(200);
    res.json({ message: 'Not found' });
  }
});

module.exports = router;
