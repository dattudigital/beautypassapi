var express = require('express');
var router = express.Router();
var writtenTestimonialController = require('../controllers/writtenTestimonialController');
var wtc = new writtenTestimonialController();
var middleAuth = require('../utils/auth/tokenAuth');
var role = require('../utils/auth/authorization');

router.get('/', middleAuth, role.isSuperOrCandidate, wtc.getAll.bind(wtc));

router.get('/:id/:studioid', middleAuth, role.isSuperOrCandidate, wtc.getMyWrittenTestimonial.bind(wtc));

router.post('/', middleAuth, role.isSuperOrCandidate, wtc.create.bind(wtc));

module.exports = router;