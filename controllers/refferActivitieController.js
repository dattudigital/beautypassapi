var videoTestimonialModel = require('../models/refferActivitieModel');
var CommonController = require('../utils/controller/controllerUtil');
var vtm;
var controllerUtil;
function refferActivitieController() {
    vtm = new videoTestimonialModel();
    controllerUtil = new CommonController();
}

refferActivitieController.prototype.getAll = function (req, res, next) {
     controllerUtil.getAll(vtm, req, res, next);
};

refferActivitieController.prototype.create = function (req, res, next) {
    controllerUtil.create(vtm, req, res, next);
};

refferActivitieController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(vtm, req, res, next);
};

module.exports = refferActivitieController;