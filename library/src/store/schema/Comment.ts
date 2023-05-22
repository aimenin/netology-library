import { Schema, model } from 'mongoose';

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

const Comment = model('Comment', commentSchema);

export default Comment;
