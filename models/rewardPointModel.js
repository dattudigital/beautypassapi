var connection = require('../utils/db/mysqlConnection');

function refferActivitieModel() {
    this.dbMySQL = connection;
}

refferActivitieModel.prototype.getAll = function (params, callback) {
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
            sql = sql + "  rp.rewardpoint_status = 1";
        }
    }
    console.log('SELECT rp.`*`,(SELECT CONCAT(e1.emp_firstname , " ", e1.emp_lastname ) FROM employee e  WHERE e.employee_id = rp.createdempid ) AS createdempname,(SELECT CONCAT(e2.emp_firstname , " ", e2.emp_lastname ) FROM employee e2  WHERE e2.employee_id = rp.updatedempid ) AS updatedempname FROM rewardpoint rp left join employee e1 on rp.createdempid = e1.employee_id '+ sql)
    this.dbMySQL.connectionReader.query('SELECT rp.`*`,(SELECT CONCAT(e1.emp_firstname , " ", e1.emp_lastname ) FROM employee e  WHERE e.employee_id = rp.createdempid ) AS createdempname,(SELECT CONCAT(e2.emp_firstname , " ", e2.emp_lastname ) FROM employee e2  WHERE e2.employee_id = rp.updatedempid ) AS updatedempname FROM rewardpoint rp left join employee e1 on rp.createdempid = e1.employee_id '+ sql, function (err, results) {
        callback(err, results);
    });
};

refferActivitieModel.prototype.create = function (data, callback) {
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
    this.dbMySQL.connectionWriter.query('DELETE FROM rewardpoint WHERE rewardpoint_id=' + id, function (err, results) {
        callback(err, results);
    });
};

module.exports = refferActivitieModel;