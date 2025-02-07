//Redis session handling helpers
const redis = require('../config/redis');
const redisCient = require('../config/redis')

class SessionManager{
    async createUserSession(userId , sessionData){
        const sessionId = `user:${userId}:session`;
        await redisCient.getClient().hmset(sessionId , sessionData);
        await redisCient.getClient().expire(sessionId , 86400);
        return sessionId;
    }

    async invalidateUserSession(userId){
        const sessionId = `user:${userId}:session`;
        await redisClient.getClient().del(sessionId);
    }
}

module.exports = new SessionManager();