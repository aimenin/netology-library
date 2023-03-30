const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  author: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  createdAt: Number,
  updatedAt: Number,
});

const Comment = model('Comment', commentSchema);
module.exports = Comment;
