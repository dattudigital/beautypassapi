var express = require('express');
var router = express.Router();
var refferActivitieController = require('../controllers/refferActivitieController');
var vtc = new refferActivitieController();

router.get('/', vtc.getAll.bind(vtc));

router.post('/', vtc.create.bind(vtc));

module.exports = router;