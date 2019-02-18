var express = require('express');
var router = express.Router();
var mindbodyPackageController = require('../controllers/mindbodyPackageController');
var mcc = new mindbodyPackageController();
var middleAuth = require('../utils/auth/tokenAuth');
var role = require('../utils/auth/authorization');

router.get('/', middleAuth, role.isSuperOrCandidate, mcc.getAll.bind(mcc));

router.post('/', middleAuth, role.isSuper, mcc.create.bind(mcc));

module.exports = router;