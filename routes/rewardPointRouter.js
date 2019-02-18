var express = require('express');
var router = express.Router();
var rewardPointController = require('../controllers/rewardPointController');
var rpc = new rewardPointController();
var middleAuth = require('../utils/auth/tokenAuth');
var role = require('../utils/auth/authorization');

router.get('/',middleAuth, role.isSuperOrCandidate, rpc.getAll.bind(rpc));

router.post('/', middleAuth, role.isSuper,rpc.create.bind(rpc));

router.delete('/:id',middleAuth, role.isSuper, rpc.remove.bind(rpc));

module.exports = router;