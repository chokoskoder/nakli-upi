//connect redis here
const redis = require('ioredis');


class RedisClient {
    constructor(){
        //redis client for general operations
        this.client = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port : process.env>REDIS_PORT || 6379,
            password : process.env.REDIS_PASSWORD,

            //enable automatic reconnection on failure
            retryStrategy:(times) =>{
                const delay = Math.min(times*50 , 2000);
                return delay;
            }
        });
        //error handling 
        this.client.on('error' , (err)=>{
            console.error('redis client error:' , err);
        });

        this.client.on('connect' , ()=>{
            console.log('Success on connection to redis')
        });

        //create redis store for sessions
        this.sessionStore = new RedisStore({
            client: this.client,
            prefix: 'session', //prefix for session keys
            ttl : 86400,    //session ttl in seconds (24 hours)
        });
    }
    getClient(){
        return this.client;
    }
}

module.exports = new RedisClient();