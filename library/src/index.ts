import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import path = require('path');
import passport from 'passport';
import session from 'express-session';
import { Server } from 'socket.io';

import booksApiRouter from './routes/api/books';
import booksViewRouter from './routes/views/books';
import userRouter from './routes/api/user';
import indexRouter from './routes';
import User from './store/schema/User';
import Comment from './store/schema/Comment';

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

const PORT = Number(process.env.PORT) || 3000;

const startApp = async (port: number) => {
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
