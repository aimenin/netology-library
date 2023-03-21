const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

const connectToDataBase = async () => {
  const client = await mongoose.connect('mongodb://root:example@mongo:27017/');

  return client;
};

class Book {
  constructor(
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
    fileBook = '',
    id = uuid()
  ) {
    this.title = title;
    this.description = description;
    this.id = id;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  }
}

let store = {
  books: [
    new Book(
      'test',
      'good test',
      'me',
      'true',
      'me.jpg',
      'me.txt',
      'test.jpg',
      'fortest'
    ),
  ],
};

const getStore = () => {
  return store;
};

const setStore = (newStore) => {
  store = newStore;
};

module.exports = {
  store,
  Book,
  getStore,
  setStore,
};
