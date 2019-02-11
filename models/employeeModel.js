var connection = require('../utils/db/mysqlConnection');

function employeeModel() {
    this.dbMySQL = connection;
}

employeeModel.prototype.getAll = function (params, callback) {
    this.dbMySQL.connectionReader.query(' select * from employee where emp_status=1 ', function (err, results) {
        callback(err, results);
    });
};

employeeModel.prototype.create = function (data, callback) {
    if (!data.employee_id) {
        this.dbMySQL.connectionWriter.query('insert into employee SET ?', data, function (err, result) {
            if (err) {
                callback(err, data);
            } else {
                data.employee_id = result.insertId;
                callback(err, data);
            }
        });
    } else {
        this.dbMySQL.connectionWriter.query('UPDATE employee SET ? WHERE employee_id = ' + data.employee_id, data,
            function (err, results) {                
                callback(err, data);
            });
    }
};

module.exports = employeeModel;