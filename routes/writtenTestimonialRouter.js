var express = require('express');
var router = express.Router();
var writtenTestimonialController = require('../controllers/writtenTestimonialController');
var wtc = new writtenTestimonialController();

router.get('/', wtc.getAll.bind(wtc));

router.get('/:id/:studioid', wtc.getMyWrittenTestimonial.bind(wtc));

router.post('/', wtc.create.bind(wtc));

module.exports = router;