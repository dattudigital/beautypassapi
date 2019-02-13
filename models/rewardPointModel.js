var connection = require('../utils/db/mysqlConnection');

function refferActivitieModel() {
    this.dbMySQL = connection;
}

refferActivitieModel.prototype.getAll = function (params, callback) {
    console.log("*******came *****");
    this.dbMySQL.connectionReader.query('SELECT rp.`*`,(SELECT CONCAT(e1.emp_firstname , " ", e1.emp_lastname ) FROM employee e  WHERE e.employee_id = rp.createdempid ) AS createdempname,(SELECT CONCAT(e2.emp_firstname , " ", e2.emp_lastname ) FROM employee e2  WHERE e2.employee_id = rp.updatedempid ) AS updatedempname FROM rewardpoint rp left join employee e1 on rp.createdempid = e1.employee_id where rp.rewardpoint_status = 1', function (err, results) {
        console.log(err, results);
        callback(err, results);
    });
};

refferActivitieModel.prototype.create = function (data, callback) {
    console.log("*******came *****");
    if (!data.rewardpoint_id) {
        this.dbMySQL.connectionWriter.query('insert into rewardpoint SET ?', data, function (err, result) {
            if (err) {
                callback(err, data);
            } else {
                data.rewardpoint_id = result.insertId;
                callback(err, data);
            }
        });
    } else {
        this.dbMySQL.connectionWriter.query('UPDATE rewardpoint SET ? WHERE rewardpoint_id = ' + data.rewardpoint_id, data,
            function (err, results) {
                callback(err, data);
            });
    }
};

refferActivitieModel.prototype.remove = function (id, callback) {
    this.dbMySQL.connectionWriter.query('DELETE FROM reff_activities WHERE rewardpoint_id=' + id, function (err, results) {
        callback(err, results);
    });
};

module.exports = refferActivitieModel;