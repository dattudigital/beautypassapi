var connection = require('../utils/db/mysqlConnection');

function mindbodyCouponModel() {
    this.dbMySQL = connection;
}

mindbodyCouponModel.prototype.getAll = function (params, callback) {
    this.dbMySQL.connectionReader.query(' select * from mindbody_coupons where coupons_status = 1 ', function (err, results) {
        callback(err, results);
    });
};

mindbodyCouponModel.prototype.create = function (data, callback) {
    if (!data.coupons_id) {
        this.dbMySQL.connectionWriter.query('insert into mindbody_coupons SET ?', data, function (err, result) {
            if (err) {
                callback(err, data);
            } else {
                data.coupons_id = result.insertId;
                callback(err, data);
            }
        });
    } else {
        this.dbMySQL.connectionWriter.query('UPDATE mindbody_coupons SET ? WHERE coupons_id = ' + data.coupons_id, data,
            function (err, results) {                
                callback(err, data);
            });
    }
};

module.exports = mindbodyCouponModel;