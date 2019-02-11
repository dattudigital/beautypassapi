var userModel = require('../models/userModel');
var CommonController = require('../utils/controller/controllerUtil');
var vtm;
var controllerUtil;
function userController() {
    vtm = new userModel();
    controllerUtil = new CommonController();
}

userController.prototype.getAll = function (req, res, next) {
    controllerUtil.getAll(vtm, req, res, next);
};

module.exports = userController;