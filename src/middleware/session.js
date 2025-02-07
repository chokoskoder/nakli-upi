const session = require('express-session');
const RedisStore = require('connect-redis').defualt;
const redis = require('../config/redis.js')

const sessionMiddleware = session({
    store: new RedisStore({
        client: redisClient.getClient(),
        prefix:'session',
        ttl : 86400,
    }),
    sescret: process.env.SESSION_SECRET,
    name : 'sessionId',
    resave : false,
    saveUninitialized : false,
    cookie:{
        secure : process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge:  86400000,
        sameSite : 'strict'
    }
});

module.exports = sessionMiddleware;