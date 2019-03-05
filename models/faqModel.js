var connection = require('../utils/db/mysqlConnection');

function faqModel() {
    this.dbMySQL = connection;
}

faqModel.prototype.getAll = function (params, callback) {
    var sql = '';
    var count = 0;
    if (params.query) {
        if (params.query.status) {
            if (count == 0) {
                count++
                sql = sql + " where ";
            } else {
                sql = sql + " and ";
            }
            sql = sql + " faq_status = 1";
        }
    }
    this.dbMySQL.connectionReader.query(' select * from faqs ' + sql, function (err, results) {
        callback(err, results);
    });
};

faqModel.prototype.create = function (data, callback) {
    if (!data.faq_id) {
        data.faq_createddate = moment(new Date().now).tz(new Date().toString().match(/([-\+][0-9]+)\s/)[1]).format('YYYY-MM-DD HH:mm:ss');
        data.faq_modifydate = moment(new Date().now).tz(new Date().toString().match(/([-\+][0-9]+)\s/)[1]).format('YYYY-MM-DD HH:mm:ss');
        this.dbMySQL.connectionWriter.query('insert into faqs SET ?', data, function (err, result) {
            if (err) {
                callback(err, data);
            } else {
                data.faq_id = result.insertId;
                callback(err, data);
            }
        });
    } else {
        data.faq_modifydate = moment(new Date().now).tz(new Date().toString().match(/([-\+][0-9]+)\s/)[1]).format('YYYY-MM-DD HH:mm:ss');
        this.dbMySQL.connectionWriter.query('UPDATE faqs SET ? WHERE faq_id = ' + data.faq_id, data,
            function (err, results) {
                callback(err, data);
            });
    }
};

faqModel.prototype.remove = function (id, callback) {
    this.dbMySQL.connectionWriter.query('DELETE FROM faqs WHERE faq_id=' + id, function (err, results) {
        callback(err, results);
    });
};

module.exports = faqModel;