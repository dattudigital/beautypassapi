const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

function redisCache() {

}

redisCache.prototype.set = function (url, data) {

    myCache.set(url, data, function (err, success) {
        if (!err && success) {
            console.log("******************* redis SET")
            console.log(err);
            console.log(success);  // if success true 
        }
        // callback(err, success)
    });
    // client.hmset(url,'0', JSON.stringify(data));   
}

redisCache.prototype.get = function (url, callback) {
    // client.hgetall(url, function (err, replay) {
    //     if(err){
    //         callback(err, JSON.parse(replay));
    //     } else  {
    //         if(_.isNull(replay)){
    //             callback(err, JSON.parse(replay));
    //         } else {
    //             callback(err, JSON.parse(replay["0"]));
    //         }
    //     }        
    // });
    myCache.get(url, function (err, value) {
        console.log("######################## redis GET");
        console.log(err) // wrong key null 
        //console.log(value) // wrong key undefined 
        // if (!err) {
        //     if (value == undefined) {
        //         // key not found
        //     } else {
        //         console.log(value);
        //         //{ my: "Special", variable: 42 }
        //         // ... do something ...
        //     }
        // }
        callback(err, value)
    });
}

redisCache.prototype.delete = function (url) {
    // client.del(url);
    myCache.del(url, function (err, count) {
        // if( !err ){
        //   console.log( count ); // 1
        //   // ... do something ...
        // }
        // callback(err, count)
    });
}

module.exports = redisCache;