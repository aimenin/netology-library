const express = require('express');

const counterRouter = require('./routes/api/counter');

const app = express();

app.use(express.json());
app.use('/counter', counterRouter);

const PORT = process.env.PORT || 3002;
console.log('App is listening on port: ' + PORT);
app.listen(PORT);
