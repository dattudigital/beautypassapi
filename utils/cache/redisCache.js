var redis = require("redis");
var _ = require("lodash");
var client = redis.createClient("6379", "127.0.0.1");

client.on('connect', function () {
    console.log("redis Connected")
});

client.on('error', function () {
    console.log("redis Connected");
});

function redisCache() {
    // client.del("/video-testimonials");
}

redisCache.prototype.set = function (url, data) {
    client.hmset(url,'0', JSON.stringify(data));   
}

redisCache.prototype.get = function (url, callback) {
    client.hgetall(url, function (err, replay) {
        if(err){
            callback(err, JSON.parse(replay));
        } else  {
            if(_.isNull(replay)){
                callback(err, JSON.parse(replay));
            } else {
                callback(err, JSON.parse(replay["0"]));
            }
        }        
    });
}

redisCache.prototype.delete = function (url,callback) {
    console.log(url);
    if(url == '/beauty-tips'){
        client.del('/beauty-tips?type=2');
        client.del('/beauty-tips?type=1');
    }
    client.del(url);
}

module.exports = redisCache;