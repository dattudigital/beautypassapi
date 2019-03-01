
var _ = require("lodash");


function redisCache() {
    // client.del("/video-testimonials");
}

redisCache.prototype.set = function (url, data) {
    client.hmset(url, '0', JSON.stringify(data));
}

redisCache.prototype.get = function (url, callback) {
    client.hgetall(url, function (err, replay) {
        if (err) {
            callback(err, JSON.parse(replay));
        } else {
            if (_.isNull(replay)) {
                callback(err, JSON.parse(replay));
            } else {
                callback(err, JSON.parse(replay["0"]));
            }
        }
    });
}

redisCache.prototype.delete = function (url, callback) {
    if (url.match(/beauty-tips/g)) {
        client.del('/beauty-tips?type=2&status=1');
        client.del('/beauty-tips');
        client.del('/beauty-tips?status=1');
        client.del('/beauty-tips?type=2');
        client.del('/beauty-tips?type=1');
        client.del('/beauty-tips?type=1&status=1');        
    }
    if (url.match(/faqs/g)) {
        console.log("came to statussssssss")
        client.del('/faqs?status=1');
        client.del('/faqs');
    }

    if (url.match(/reffer-activities/g)) {
        client.del('/reffer-activities?status=1');
        client.del('/reffer-activities');
        client.del('/reffer-activities?status=1&enddate=1');
    }
    if (url.match(/reward-points/g)) {
        client.del('/reward-points?status=1');
        client.del('/reward-points');
    }
    if (url.match(/employees/g)) {
        client.del('/employees?status=1');
        client.del('/employees');
    }
    if (url.match(/mindbody-coupons/g)) {
        client.del('/mindbody-coupons?status=1');
        client.del('/mindbody-coupons');
    }
    if (url.match(/written-testimonials/g)) {
        client.del('/written-testimonials?rating=3');
    }
    client.del(url);
}

module.exports = redisCache;