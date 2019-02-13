var employeeModel = require('../models/employeeModel');
var CommonController = require('../utils/controller/controllerUtil');
var em;
var controllerUtil;
function employeeController() {
    em = new employeeModel();
    controllerUtil = new CommonController();
}

employeeController.prototype.getAll = function (req, res, next) {
     controllerUtil.getAll(em, req, res, next);
};

employeeController.prototype.create = function (req, res, next) {
    controllerUtil.create(em, req, res, next);
};

employeeController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(em, req, res, next);
};

module.exports = employeeController;