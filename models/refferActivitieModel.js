var connection = require('../utils/db/mysqlConnection');

function refferActivitieModel() {
    this.dbMySQL = connection;
}

refferActivitieModel.prototype.getAll = function (params, callback) {
    console.log("*******came *****");
    this.dbMySQL.connectionReader.query('SELECT ra.`*`,(SELECT CONCAT(e1.emp_firstname , " ", e1.emp_lastname ) FROM employee e  WHERE e.employee_id = ra.createdemp_id ) AS createdempname,(SELECT CONCAT(e2.emp_firstname , " ", e2.emp_lastname ) FROM employee e2  WHERE e2.employee_id = ra.updatedempid ) AS updatedempname FROM reff_activities ra left join employee e1 on ra.createdemp_id = e1.employee_id  where ra.activity_status = 1', function (err, results) {
        console.log(err, results);
        callback(err, results);
    });
};

refferActivitieModel.prototype.create = function (data, callback) {
    console.log("*******came *****");
    if (!data.activity_id) {
        this.dbMySQL.connectionWriter.query('insert into reff_activities SET ?', data, function (err, result) {
            if (err) {
                callback(err, data);
            } else {
                data.activity_id = result.insertId;
                callback(err, data);
            }
        });
    } else {
        this.dbMySQL.connectionWriter.query('UPDATE reff_activities SET ? WHERE activity_id = ' + data.activity_id, data,
            function (err, results) {                
                callback(err, data);
            });
    }
};

refferActivitieModel.prototype.remove = function (id, callback) {
    console.log("*******came *****");
    this.dbMySQL.connectionWriter.query('DELETE FROM reff_activities WHERE activity_id=' + id, function (err, results) {
        callback(err, results);
    });
};

module.exports = refferActivitieModel;