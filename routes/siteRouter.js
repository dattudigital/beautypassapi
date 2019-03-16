var express = require('express');
var router = express.Router();
var siteController = require('../controllers/siteController');
var sc = new siteController();
var middleAuth = require('../utils/auth/tokenAuth');
var role = require('../utils/auth/authorization');

router.get('/', middleAuth, role.isSuperOrCandidate, sc.getAll.bind(sc));

module.exports = router;