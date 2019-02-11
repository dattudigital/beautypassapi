var connection = require('../utils/db/mysqlConnection');

function userModel() {
    this.dbMySQL = connection;
}

userModel.prototype.getAll = function (params, callback) {
    console.log("******* came TO Model *****");
    this.dbMySQL.connectionReader.query('SELECT user_id,fullname,email_id,mobile,gender,mindbody_id FROM users', function (err, results) {
        callback(err, results);
    });
};

module.exports = userModel;