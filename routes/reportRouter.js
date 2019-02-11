var express = require('express');
var router = express.Router();
var reportController = require('../controllers/reportController');
var vtc = new reportController();

router.get('/perks/', vtc.getPerksReport.bind(vtc));

router.get('/vocher/', vtc.getVocherReport.bind(vtc));

module.exports = router;