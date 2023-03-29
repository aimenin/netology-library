const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const booksApiRouter = require('./routes/api/books');
const booksViewRouter = require('./routes/views/books');
const userRouter = require('./routes/api/user');
const indexRouter = require('./routes');
const User = require('./store/schema/User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(
  session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use('/', indexRouter);
app.use('/api/books', booksApiRouter);
app.use('/views/books', booksViewRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;

const startApp = async (port) => {
  await mongoose.connect('mongodb://root:example@mongo:27017/');
  console.log('App is listening on port: ' + PORT);
  app.listen(port);
};

startApp(PORT);
