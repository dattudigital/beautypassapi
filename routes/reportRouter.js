var express = require('express');
var router = express.Router();
var reportController = require('../controllers/reportController');
var vtc = new reportController();
var middleAuth = require('../utils/auth/tokenAuth');
var role = require('../utils/auth/authorization');

router.get('/perks/',middleAuth, role.isSuper, vtc.getPerksReport.bind(vtc));

router.get('/vocher/',middleAuth, role.isSuper, vtc.getVocherReport.bind(vtc));

module.exports = router;