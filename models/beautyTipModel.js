var connection = require('../utils/db/mysqlConnection');
var async = require("async");
var fs = require("fs");
var Path = require("path");
var config = require("../config//config.json");

function beautyTipModel() {
    this.dbMySQL = connection;
}

beautyTipModel.prototype.getAll = function (params, callback) {
    var sql = '';
    var count = 0;
    if (params.query) {
        if (params.query.type) {
            if (count == 0) {
                count++
                sql = sql + " where ";
            } else {
                sql = sql + " and ";
            }
            sql = sql + " tip_type = " + params.query.type;
        }

        if (params.query.status) {
            if (count == 0) {
                count++
                sql = sql + " where ";
            } else {
                sql = sql + " and ";
            }
            sql = sql + " rec_status = 1";
        }
    }
    this.dbMySQL.connectionReader.query('select * from beauty_tips ' + sql, function (err, results) {
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
                    fs.writeFile(Path.join(config.FOLDER_PATH + data.profile_name), buf, function (error) {
                        data.tip_img = config.INSTANCE_URL + data.profile_name;
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
            con1.connectionWriter.query('UPDATE beauty_tips SET ? WHERE tip_id = ' + data.tip_id, data, function (error, results) {
                if (error) {
                    callback(error, data);
                } else {
                    callback(error, data);
                }
            });
        }
    })
};

beautyTipModel.prototype.remove = function (id, callback) {
    this.dbMySQL.connectionWriter.query('DELETE FROM beauty_tips WHERE  tip_id=' + id, function (err, results) {
        callback(err, results);
    });
};

module.exports = beautyTipModel;