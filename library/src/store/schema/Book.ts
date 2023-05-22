import { Document, Schema, model } from 'mongoose';
import { IBook } from '../../types/Book';

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
    type: [String],
    default: [],
  },
  favorite: {
    type: Boolean,
    default: false,
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

const Book = model<IBook & Document>('Book', bookSchema);

export default Book;
