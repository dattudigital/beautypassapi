var rewardPointModel = require('../models/rewardPointModel');
var CommonController = require('../utils/controller/controllerUtil');
var ram;
var controllerUtil;
function rewardPointController() {
    ram = new rewardPointModel();
    controllerUtil = new CommonController();
}

rewardPointController.prototype.getAll = function (req, res, next) {
     controllerUtil.getAll(ram, req, res, next);
};

rewardPointController.prototype.create = function (req, res, next) {
    controllerUtil.create(ram, req, res, next);
};

module.exports = rewardPointController;