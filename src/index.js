const express = require('express');

const booksRouter = require('./routes/books');
const userRouter = require('./routes/user');
const indexRouter = require('./routes');

const app = express();
app.use(express.json());
app.use('/api', indexRouter);
app.use('/api/books', booksRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;
console.log('App is listening on port: ' + PORT);
app.listen(PORT);
