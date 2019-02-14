var express = require('express');
var router = express.Router();
var faqController = require('../controllers/faqController');
var fc = new faqController();
var middleAuth = require('../utils/auth/tokenAuth');

router.get('/', middleAuth, fc.getAll.bind(fc));

router.post('/', fc.create.bind(fc));

router.delete('/:id', fc.remove.bind(fc));

module.exports = router;