const redis = require('redis');

const REDIS_URL = process.env.REDIS_URL || 'localhost';

const connectToRedis = async () => {
  const client = redis.createClient({ url: REDIS_URL });
  await client.connect();
  return client;
};

module.exports = connectToRedis;
