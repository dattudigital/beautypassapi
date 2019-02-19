var mindbodyCouponModel = require('../models/mindbodyCouponModel');
var CommonController = require('../utils/controller/controllerUtil');
var mcm;
var controllerUtil;
var redis = require("../utils/cache/redisCache");
var rc;
function mindbodyCouponController() {
    rc = new redis();
    mcm = new mindbodyCouponModel();
    controllerUtil = new CommonController();
}

mindbodyCouponController.prototype.getAll = function (req, res, next) {
    // rc.delete('/mindbody-coupons');
     controllerUtil.getAll(mcm, req, res, next);
};

mindbodyCouponController.prototype.create = function (req, res, next) {
    // rc.delete('/mindbody-coupons');
    controllerUtil.create(mcm, req, res, next);
};

mindbodyCouponController.prototype.remove = function (req, res, next) {
    // rc.delete('/mindbody-coupons');
    controllerUtil.remove(mcm, req, res, next);
};

module.exports = mindbodyCouponController;