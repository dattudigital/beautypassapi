var express = require('express');
var router = express.Router();
var videoTestimonialController = require('../controllers/videoTestimonialController');
var vtc = new videoTestimonialController();

router.get('/', vtc.getAll.bind(vtc));

router.get('/:id/:studioid', vtc.getMyVideoTestimonial.bind(vtc));

router.post('/', vtc.create.bind(vtc));

module.exports = router;