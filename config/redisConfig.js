const Redis = require('ioredis');
const fs = require('fs');

const redis = new Redis({
    host: 'redis-17003.c266.us-east-1-3.ec2.cloud.redislabs.com',
    port: 17003,
    password: 'fBYYTSId3kdRP0jXGZSIfb1EeqANuhq6'
});

module.exports = redis