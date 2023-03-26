const redis = require('redis');

const REDIS_URL = process.env.REDIS_URL || 'localhost';

const client = redis.createClient({ url: REDIS_URL });

module.exports = client;
