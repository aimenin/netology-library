import { Router } from 'express';

import Book from '../store/schema/Book';

const router = Router();

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

export default router;
