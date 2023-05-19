import express from 'express';

import { container } from '../../types/Container';
import { BooksRepository } from '../../types/Book';

const router = express.Router();

router.get(':id', async (req, res, next) => {
  const repo = container.get(BooksRepository);
  const book = await repo.getBook(req.params.id);
  res.json(book);
});
