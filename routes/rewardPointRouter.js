var express = require('express');
var router = express.Router();
var rewardPointController = require('../controllers/rewardPointController');
var rpc = new rewardPointController();

router.get('/', rpc.getAll.bind(rpc));

router.post('/', rpc.create.bind(rpc));

module.exports = router;