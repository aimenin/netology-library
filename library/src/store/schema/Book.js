const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  authors: {
    type: String,
    default: '',
  },
  favorite: {
    type: String,
    default: '',
  },
  fileCover: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: '',
  },
});

const Book = model('Book', bookSchema);
module.exports = Book;
