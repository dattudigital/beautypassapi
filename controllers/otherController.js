var otherModel = require('../models/otherModel');
var CommonController = require('../utils/controller/controllerUtil');
var mpm;
var controllerUtil;
function otherController() {
    mpm = new otherModel();
    controllerUtil = new CommonController();
}

otherController.prototype.webLogin = function (req, res) {
    mpm.webLogin(req, res)
};

otherController.prototype.webDashbaord = function (req, res, next) {
    mpm.webDashbaord(req, res);
};

otherController.prototype.mobileDashbaord = function (req, res, next) {
    mpm.mobileDashbaord(req, res);
};

otherController.prototype.sendOTPUser = function (req, res, next) {
    mpm.sendOTPUser(req, res);
};

otherController.prototype.verifyOTPUser = function (req, res, next) {
    mpm.verifyOTPUser(req, res);
};

otherController.prototype.checkValidUser = function (req, res, next) {
    mpm.checkValidUser(req, res);
};

otherController.prototype.userSearch = function (req, res, next) {
    mpm.userSearch(req, res);
};

otherController.prototype.userPoints = function (req, res, next) {
    mpm.userPoints(req, res);
};

otherController.prototype.checkCoupon = function (req, res, next) {
    mpm.checkCoupon(req, res);
};

otherController.prototype.myCoupon = function (req, res, next) {
    mpm.myCoupon(req, res);
};

otherController.prototype.getRewardPoint = function (req, res, next) {
    mpm.getRewardPoint(req, res);
};

otherController.prototype.graphs = function (req, res, next) {
    mpm.graphs(req, res);
};

otherController.prototype.pageLimitVideoTestimonials = function (req, res, next) {
    mpm.pageLimitVideoTestimonials(req, res);
};

otherController.prototype.pageLimitWrittenTestimonials = function (req, res, next) {
    mpm.pageLimitWrittenTestimonials(req, res);
};

otherController.prototype.users = function (req, res, next) {
    mpm.users(req, res);
};

otherController.prototype.couponUsed = function (req, res, next) {
    mpm.couponUsed(req, res);
};

otherController.prototype.saveDeviceId = function (req, res, next) {
    mpm.saveDeviceId(req, res);
};

otherController.prototype.login = function (req, res, next) {
    mpm.login(req, res);
};

otherController.prototype.bulkUploadCoupon = function (req, res, next) {
    mpm.bulkUploadCoupon(req, res);
};

otherController.prototype.getUserRewardHistory = function (req, res, next) {
    mpm.getUserRewardHistory(req, res);
};

otherController.prototype.fbTestimonials = function (req, res, next) {
    mpm.fbTestimonials(req, res);
};

otherController.prototype.studioids = function (req, res, next) {
    mpm.studioids(req, res);
};


otherController.prototype.locationids = function (req, res, next) {
    mpm.locationids(req, res);
};

otherController.prototype.getUserStudioLocation = function (req, res, next) {
    mpm.getUserStudioLocation(req, res);
};

otherController.prototype.updateTestimonialLike = function (req, res, next) {
    mpm.updateTestimonialLike(req, res);
};

otherController.prototype.getLimitRecords = function (req, res, next) {
    mpm.getLimitRecords(req, res);
};

otherController.prototype.BroadcastSmsToAll = function (req, res, next) {
    mpm.BroadcastSmsToAll(req, res);
};

otherController.prototype.broadcastMembership = function (req, res, next) {
    mpm.broadcastMembership(req, res);
};

otherController.prototype.broadcastMembershipSendSms = function (req, res, next) {
    mpm.broadcastMembershipSendSms(req, res);
};

module.exports = otherController;
