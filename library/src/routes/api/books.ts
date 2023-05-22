// import express from 'express';

// import { container } from '../../types/Container';
// import { BooksRepository } from '../../types/Book';

// const router = express.Router();

// router.get(':id', async (req, res, next) => {
//   const repo = container.get(BooksRepository);
//   const book = await repo.getBook(req.params.id);
//   res.json(book);
// });

import { Router } from 'express';
import appRoot from 'app-root-path';
const router = Router();

import Book from '../../store/schema/Book';
import fileMulter from '../../middlewares/file';

router.get('/', async (req, res) => {
  try {
    const books = await Book.find().select('-__v');
    res.json(books);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).select('-__v');

    if (!book) {
      res.status(404);
      res.json('404 | книга не найдена');
      return;
    }

    res.json(book);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  } = req.body;

  const newBook = new Book({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  });

  try {
    await newBook.save();
    res.json(newBook);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    });
    res.status(200).json(book);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Book.deleteOne({ _id: id });
    res.json(true);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/upload-file', fileMulter.single('book-file'), (req, res) => {
  if (req.file) {
    const { filename } = req.file;
    res.json({ filename });
  }
  res.json();
});

router.get('/:id/download', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).select('-__v');
    const file = `${appRoot}/public/books/${book.fileBook}`;
    res.download(file);
  } catch (e) {
    res.status(500).json(e);
  }
});

export default router;
