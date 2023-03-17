# netology-library
project for netology

## Homework 2.6

1.
```js
db.books.insertMany([
  {
    title: "book1",
    description: "desc1",
    authors: "author1"
  },
  {
    title: "book2",
    description: "desc2",
    authors: "author2"
  }
]);
```
2.
```js
db.books.find( { title: "book1" } );
```
3.
```js
db.books.updateOne(
   { "_id": "12345" },
   {
     $set: { "description": "newDesc", authors: "newAuthor" }
   }
)
```
