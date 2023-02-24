const { v4: uuid } = require('uuid');

class Book {
  constructor(
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
    id = uuid()
  ) {
    this.title = title;
    this.description = description;
    this.id = id;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}

let store = {
  books: [
    new Book('test', 'good test', 'me', 'true', 'me.jpg', 'me.txt', 'fortest'),
  ],
};

module.exports = {
  store,
  Book,
};
