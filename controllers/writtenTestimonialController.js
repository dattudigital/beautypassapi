var writtenTestimonialModel = require('../models/writtenTestimonialModel');
var CommonController = require('../utils/controller/controllerUtil');
var wtm;
var controllerUtil;
var redis = require("../utils/cache/redisCache");
var rc;

function writtenTestimonialController() {
    rc = new redis();
    wtm = new writtenTestimonialModel();
    controllerUtil = new CommonController();
}

writtenTestimonialController.prototype.getAll = function (req, res, next) {
    // rc.delete('/written-testimonials');
    controllerUtil.getAll(wtm, req, res, next);
};

writtenTestimonialController.prototype.create = function (req, res, next) {
    controllerUtil.create(wtm, req, res, next);
};

writtenTestimonialController.prototype.getMyWrittenTestimonial = function (req, res, next) {
    wtm.getMyWrittenTestimonial(req, res)
};

module.exports = writtenTestimonialController;