var videoTestimonialModel = require('../models/videoTestimonialModel');
var CommonController = require('../utils/controller/controllerUtil');
var vtm;
var controllerUtil;
function videoTestimonialController() {
    vtm = new videoTestimonialModel();
    controllerUtil = new CommonController();
}

videoTestimonialController.prototype.getAll = function (req, res, next) {
    controllerUtil.getAll(vtm, req, res, next);
};

videoTestimonialController.prototype.create = function (req, res, next) {
    controllerUtil.create(vtm, req, res, next);
};

videoTestimonialController.prototype.getMyVideoTestimonial = function (req, res, next) {
    vtm.getMyVideoTestimonial(req, res)
};

module.exports = videoTestimonialController;