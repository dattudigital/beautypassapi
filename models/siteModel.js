var connection = require('../utils/db/mysqlConnection');

function siteModel() {
    this.dbMySQL = connection;
}

siteModel.prototype.getAll = function (params, callback) {
    console.log('select * from studios')
    this.dbMySQL.connectionReader.query(' select * from studios', function (err, results) {
        callback(err, results);
    });
};



module.exports = siteModel;