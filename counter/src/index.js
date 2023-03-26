const express = require('express');

const counterRouter = require('./routes/api/counter');
const client = require('./utils/connectToRedis');

const app = express();

app.use(express.json());
app.use('/counter', counterRouter);

const startApp = async () => {
  await client.connect();
  const PORT = process.env.PORT || 3002;
  app.listen(PORT);
  console.log('App is listening on port: ' + PORT);
};

startApp();
