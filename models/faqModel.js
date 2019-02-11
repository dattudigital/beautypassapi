var connection = require('../utils/db/mysqlConnection');
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

function faqModel() {
    this.dbMySQL = connection;
}

faqModel.prototype.getAll = function (params, callback) {
    this.dbMySQL.connectionReader.query(' select * from faqs where faq_status = 1 ', function (err, results) {
        callback(err, results);
    });
};

faqModel.prototype.create = function (data, callback) {
    if (!data.faq_id) {
        this.dbMySQL.connectionWriter.query('insert into faqs SET ?', data, function (err, result) {
            if (err) {
                callback(err, data);
            } else {
                data.faq_id = result.insertId;
                callback(err, data);
            }
        });
    } else {
        this.dbMySQL.connectionWriter.query('UPDATE faqs SET ? WHERE faq_id = ' + data.faq_id, data,
            function (err, results) {
                callback(err, data);
            });
    }
};

module.exports = faqModel;