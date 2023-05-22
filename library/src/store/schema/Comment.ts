import { Schema, model } from 'mongoose';
import { IComment } from '../../types/Comment';

const commentSchema = new Schema({
  author: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  bookId: {
    type: String,
    default: '',
  },
  createdAt: Number,
  updatedAt: Number,
});

const Comment = model<IComment & Document>('Comment', commentSchema);

export default Comment;
