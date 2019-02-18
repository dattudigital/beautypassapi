var express = require('express');
var router = express.Router();
var videoTestimonialController = require('../controllers/videoTestimonialController');
var vtc = new videoTestimonialController();
var middleAuth = require('../utils/auth/tokenAuth');
var role = require('../utils/auth/authorization');

router.get('/', middleAuth, role.isSuperOrCandidate, vtc.getAll.bind(vtc));

router.get('/:id/:studioid', middleAuth, role.isSuperOrCandidate, vtc.getMyVideoTestimonial.bind(vtc));

router.post('/', middleAuth, role.isSuperOrCandidate, vtc.create.bind(vtc));

module.exports = router;