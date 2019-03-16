var siteModel = require('../models/siteModel');
var CommonController = require('../utils/controller/controllerUtil');
var sm;
var controllerUtil;
function siteController() {
    sm = new siteModel();
    controllerUtil = new CommonController();
}

siteController.prototype.getAll = function (req, res, next) {
    console.log('site')
    controllerUtil.getAll(sm, req, res, next);
};

module.exports = siteController;