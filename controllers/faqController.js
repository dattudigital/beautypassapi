var faqModel = require('../models/faqModel');
var CommonController = require('../utils/controller/controllerUtil');
var fm;
var controllerUtil;
function faqController() {
    fm = new faqModel();
    controllerUtil = new CommonController();
}

faqController.prototype.getAll = function (req, res, next) {
     controllerUtil.getAll(fm, req, res, next);
};

faqController.prototype.create = function (req, res, next) {
    controllerUtil.create(fm, req, res, next);
};

faqController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(fm, req, res, next);
};

module.exports = faqController;