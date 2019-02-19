var beautyTipModel = require('../models/beautyTipModel');
var CommonController = require('../utils/controller/controllerUtil');
var btc;
var controllerUtil;
var redis = require("../utils/cache/redisCache");
var rc;

function beautyTipController() {
    rc = new redis();
    btc = new beautyTipModel();
    controllerUtil = new CommonController();
}

beautyTipController.prototype.getAll = function (req, res, next) {
    // rc.delete('/beauty-tips');
    controllerUtil.getAll(btc, req, res, next);
};

beautyTipController.prototype.create = function (req, res, next) {
    controllerUtil.create(btc, req, res, next);
};

beautyTipController.prototype.remove = function (req, res, next) {
    console.log("delete")
    controllerUtil.remove(btc, req, res, next);
};

module.exports = beautyTipController;