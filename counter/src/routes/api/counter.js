const express = require('express');
const router = express.Router();

const client = require('../../utils/connectToRedis');

router.post('/:bookId/incr', async (req, res) => {
  const { bookId } = req.params;

  const incr = await client.incr(bookId);

  res.status(200);
  res.json({ message: 'Incremented!', incr });
});

router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;

  try {
    const counter = await client.get(bookId);
    res.status(200);
    res.json({ message: 'Founded', counter });
  } catch {
    res.status(200);
    res.json({ message: 'Not found' });
  }
});

module.exports = router;
