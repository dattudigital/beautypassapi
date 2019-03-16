var mindbodyPackageModel = require('../models/mindbodyPackageModel');
var CommonController = require('../utils/controller/controllerUtil');
var mpm;
var controllerUtil;
function mindbodyPackageController() {
    mpm = new mindbodyPackageModel();
    controllerUtil = new CommonController();
}

mindbodyPackageController.prototype.getAll = function (req, res, next) {
    console.log('%%%%%%%%%%%%%%%%%')
    controllerUtil.getAll(mpm, req, res, next);
};

mindbodyPackageController.prototype.getById = function (req, res, next) {
    controllerUtil.getById(mpm, req, res, next);
};

mindbodyPackageController.prototype.create = function (req, res, next) {
    controllerUtil.create(mpm, req, res, next);
};

mindbodyPackageController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(mpm, req, res, next);
}

module.exports = mindbodyPackageController;