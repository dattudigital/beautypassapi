var connection = require('../db/mysqlConnection');
var FCM = require('fcm-push');
var serverKey = 'AAAAwWvnNvs:APA91bEHeN5TUc0m2kmFfjlbJJR-CUgDyFl2o-XeyZaYWM5fA-sEPt8FefW-02nKOGzl6BOzvkzOXIzMjAEGFJqvh2YPXsjQKavr_tpsqb01ZVqwWji-D7IPz289GAHj5x8allXYttMP';
var fcm = new FCM(serverKey);

function sendMobileNotification() {
    this.dbMySQL = connection;
}

sendMobileNotification.prototype.notification = function (desc, title, mindbodyId, studioId) {
    this.dbMySQL.connectionReader.query('select * from users where mindbody_id = "' + mindbodyId + '" and studioid ="' + studioId + '"', function (error, results, fields) {
        if (error) {
            return;
        }
        if (Object.keys(results).length) {
            var message = {
                to: results[0].device_id,
                notification: {
                    title: title,
                    body: desc
                },
                data: {
                    page: title
                }
            };
            fcm.send(message)
                .then(function (response) {
                    // console.log(response);
                })
                .catch(function (err) {
                    // console.log(err);
                })
        }
    });
}

module.exports = sendMobileNotification;