const express = require('express');
const path = require('path');

const booksApiRouter = require('./routes/api/books');
const booksViewRouter = require('./routes/views/books');
const userRouter = require('./routes/api/user');
const indexRouter = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use('/', indexRouter);
app.use('/api/books', booksApiRouter);
app.use('/views/books', booksViewRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;
console.log('App is listening on port: ' + PORT);
app.listen(PORT);
