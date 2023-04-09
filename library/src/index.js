const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const { Server } = require('socket.io');

const booksApiRouter = require('./routes/api/books');
const booksViewRouter = require('./routes/views/books');
const userRouter = require('./routes/api/user');
const indexRouter = require('./routes');
const User = require('./store/schema/User');
const Comment = require('./store/schema/Comment');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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
  server.listen(port, () => {
    console.log('App is listening on port ' + port);
  });
};

io.on('connection', (socket) => {
  const { id } = socket;
  console.log(`Socket connected: ${id}`);

  // сообщение себе
  socket.on('message-to-me', (msg) => {
    msg.type = 'me';
    socket.emit('message-to-me', msg);
  });

  // работа с комнатами
  const { roomName } = socket.handshake.query;
  console.log(`Socket roomName: ${roomName}`);
  socket.join(roomName);
  socket.on('message-to-room', (msg) => {
    msg.type = `room: ${roomName}`;
    socket.to(roomName).emit('message-to-room', msg);
    socket.emit('message-to-room', msg);
  });

  socket.on('add-comment', async (msg) => {
    const newComment = new Comment({
      author: msg.author,
      text: msg.text,
      bookId: msg.bookId,
    });

    try {
      await newComment.save();
      msg.type = `room: ${roomName}`;
      socket.to(roomName).emit('message-to-room', newComment);
      socket.emit('message-to-room', newComment);
    } catch (e) {}
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
});

startApp(PORT);
