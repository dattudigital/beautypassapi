var reportModel = require('../models/reportModel');
var CommonController = require('../utils/controller/controllerUtil');
var rm;
var controllerUtil;
function refferActivitieController() {
    rm = new reportModel();
    controllerUtil = new CommonController();
}

refferActivitieController.prototype.getPerksReport = function (req, res, next) {
    rm.getPerksReport(req, res);
};

refferActivitieController.prototype.getVocherReport = function (req, res, next) {
    rm.getVocherReport(req, res)
};

module.exports = refferActivitieController;