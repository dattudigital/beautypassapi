var connection = require('../utils/db/mysqlConnection');
var async = require("async");
var fs = require("fs");
var Path = require("path");

function beautyTipModel() {
    this.dbMySQL = connection;
}

beautyTipModel.prototype.getAll = function (params, callback) {
    var sql = '';
    if (params.query) {
        if (params.query.type) {
            sql = sql + " and tip_type = " + params.query.type;
        }
    }
    console.log(params)
    console.log('select * from beauty_tips where rec_status = 1 ' + sql)
    this.dbMySQL.connectionReader.query('select * from beauty_tips where rec_status = 1 ' + sql, function (err, results) {
        callback(err, results);
    });
};

beautyTipModel.prototype.create = function (data, callback) {
    var con1 = this.dbMySQL;
    async.waterfall([
        function (callback) {
            if (data.tip_img) {
                if (data.tip_img.includes(".amazonaws.com:300")) {
                    callback(data);
                } else {
                    var buf = Buffer.from(data.tip_img, 'base64');
                    fs.writeFile(Path.join('/var/server-new/uploads/' + data.profile_name), buf, function (error) {
                        data.tip_img = "http://ec2-52-66-45-172.ap-south-1.compute.amazonaws.com:3001/" + data.profile_name;
                        callback(data)
                    });
                }
            } else {
                callback(data);
            }
        }
    ], function (err, success) {
        delete data.profile_name;
        if (!data.tip_id) {
            con1.connectionWriter.query('insert into beauty_tips SET ?', data, function (err, results) {
                if (err) {
                    callback(err, data);
                } else {
                    data.tip_id = results.insertId;
                    if (data.tip_type == 1) {
                        data.tip_type = "Beauty Tip"
                    } else {
                        data.tip_type = "Hot Deals"
                    }
                    callback(err, data);
                }
            });
        } else {
            console.log("came here fir api");
            console.log(data);
            con1.connectionWriter.query('UPDATE beauty_tips SET ? WHERE tip_id = ' + data.tip_id, data, function (error, results) {
                console.log(error, results)
                if (error) {
                    callback(error, data);
                } else {
                    callback(error, data);
                }
            });
        }
    })
};

module.exports = beautyTipModel;