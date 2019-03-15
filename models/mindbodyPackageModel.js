var connection = require('../utils/db/mysqlConnection');

function mindbodyCouponModel() {
    this.dbMySQL = connection;
}

mindbodyCouponModel.prototype.getAll = function (params, callback) {
    this.dbMySQL.connectionReader.query(' select * from mindbody_packages ', function (err, results) {
        callback(err, results);
    });
};

mindbodyCouponModel.prototype.create = function (data, callback) {
    if (!data.mb_pack_id) {
        console.log('insert into mindbody_packages SET ?', data)
        this.dbMySQL.connectionWriter.query('insert into mindbody_packages SET ?', data, function (err, result) {
            console.log(err);
            console.log(result)
            if (err) {
                callback(err, data);
            } else {
                data.mb_pack_id = result.insertId;
                callback(err, data);
            }
        });
    } else {
        this.dbMySQL.connectionWriter.query('UPDATE mindbody_packages SET ? WHERE mb_pack_id = ' + data.mb_pack_id, data,
            function (err, results) {
                callback(err, data);
            });
    }
};

mindbodyCouponModel.prototype.remove = function (id, callback) {
    console.log('delete from mindbody_packages where mb_pack_id=' + id);
    this.dbMySQL.connectionWriter.query('delete from mindbody_packages where mb_pack_id=' + id, function (err, results) {
        callback(err, results);
    })
}

module.exports = mindbodyCouponModel;