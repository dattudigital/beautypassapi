var connection = require('../utils/db/mysqlConnection');

function employeeModel() {
    this.dbMySQL = connection;
}

employeeModel.prototype.getAll = function (params, callback) {
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
            sql = sql + " emp_status = 1";
        }
    }
    console.log(params)
    this.dbMySQL.connectionReader.query(' select * from employee '+ sql, function (err, results) {
        callback(err, results);
    });
};

employeeModel.prototype.create = function (data, callback) {
    if (!data.employee_id) {
        this.dbMySQL.connectionWriter.query('insert into employee SET ?', data, function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    err.status = 1;
                    err.result = "Employee Already Exist's"
                }
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

employeeModel.prototype.remove = function (id, callback) {
    this.dbMySQL.connectionWriter.query('DELETE FROM employee WHERE employee_id=' + id, function (err, results) {
        callback(err, results);
    });
};

module.exports = employeeModel;