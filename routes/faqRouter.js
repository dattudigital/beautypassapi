var express = require('express');
var router = express.Router();
var faqController = require('../controllers/faqController');
var fc = new faqController();
var middleAuth = require('../utils/auth/tokenAuth');
var role = require('../utils/auth/authorization');

router.get('/', middleAuth, role.isSuperOrCandidate, fc.getAll.bind(fc));

router.post('/', middleAuth, role.isSuper, fc.create.bind(fc));

router.delete('/:id', middleAuth, role.isSuper, fc.remove.bind(fc));

module.exports = router;